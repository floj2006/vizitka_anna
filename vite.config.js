import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import telegramHandler from "./api/telegram.js";

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function createVercelResponse(response) {
  const apiResponse = {
    setHeader(name, value) {
      response.setHeader(name, value);
      return apiResponse;
    },
    status(code) {
      response.statusCode = code;
      return apiResponse;
    },
    json(payload) {
      if (!response.headersSent) {
        response.setHeader("Content-Type", "application/json; charset=utf-8");
      }

      response.end(JSON.stringify(payload));
      return apiResponse;
    },
    end(payload) {
      response.end(payload);
      return apiResponse;
    },
  };

  return apiResponse;
}

function telegramApiMiddleware() {
  return async (request, response, next) => {
    if (!request.url?.startsWith("/api/telegram")) {
      next();
      return;
    }

    try {
      const body = await readRequestBody(request);

      await telegramHandler(
        {
          body,
          headers: request.headers,
          method: request.method,
        },
        createVercelResponse(response)
      );
    } catch {
      response.statusCode = 500;
      response.setHeader("Content-Type", "application/json; charset=utf-8");
      response.end(
        JSON.stringify({
          message: "Не получилось отправить заявку. Попробуйте ещё раз.",
        })
      );
    }
  };
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return {
    plugins: [
      react(),
      {
        name: "anna-local-telegram-api",
        configureServer(server) {
          server.middlewares.use(telegramApiMiddleware());
        },
        configurePreviewServer(server) {
          server.middlewares.use(telegramApiMiddleware());
        },
      },
    ],
  };
});
