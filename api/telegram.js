const MAX_FIELD_LENGTH = 900;

function cleanEnvValue(value) {
  if (typeof value !== "string") {
    return "";
  }

  const trimmed = value.trim();
  const quote = trimmed[0];

  if (
    (quote === '"' || quote === "'") &&
    trimmed.length > 1 &&
    trimmed[trimmed.length - 1] === quote
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

function normalizeBotToken(value) {
  return cleanEnvValue(value).replace(/^bot/i, "");
}

function cleanField(value, fallback = "не указано") {
  if (typeof value !== "string") {
    return fallback;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return fallback;
  }

  return trimmed.slice(0, MAX_FIELD_LENGTH);
}

function buildTelegramMessage(data) {
  const name = cleanField(data.name);
  const phone = cleanField(data.phone);
  const eventType = cleanField(data.eventType);
  const eventDate = cleanField(data.eventDate, "уточняется");
  const message = cleanField(data.message, "без комментария");

  return [
    "Новая заявка с сайта Анны Гатауллиной",
    "",
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Формат: ${eventType}`,
    `Дата: ${eventDate}`,
    "",
    "Комментарий:",
    message,
  ].join("\n");
}

async function readTelegramResult(telegramResponse) {
  const body = await telegramResponse.text();

  if (!body) {
    return {};
  }

  try {
    return JSON.parse(body);
  } catch {
    return { description: body };
  }
}

export default async function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  if (request.method !== "POST") {
    response.status(405).json({ message: "Метод не поддерживается" });
    return;
  }

  const botToken = normalizeBotToken(process.env.TELEGRAM_BOT_TOKEN);
  const chatId = cleanEnvValue(process.env.TELEGRAM_CHAT_ID);

  if (!botToken || !chatId) {
    console.error("Telegram form is not configured: missing env variables", {
      hasBotToken: Boolean(botToken),
      hasChatId: Boolean(chatId),
    });

    response.status(500).json({
      message: "Отправка формы пока не настроена",
    });
    return;
  }

  if (!/^\d+:[A-Za-z0-9_-]+$/.test(botToken)) {
    console.error("Telegram bot token has unexpected format");

    response.status(500).json({
      message: "Отправка формы пока не настроена",
    });
    return;
  }

  let data;

  try {
    data =
      typeof request.body === "string" ? JSON.parse(request.body) : request.body;
  } catch {
    response.status(400).json({
      message: "Некорректные данные заявки",
    });
    return;
  }

  if (!cleanField(data?.name, "") || !cleanField(data?.phone, "")) {
    response.status(400).json({
      message: "Укажите имя и телефон",
    });
    return;
  }

  try {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: buildTelegramMessage(data),
        }),
      }
    );

    const telegramResult = await readTelegramResult(telegramResponse);

    if (!telegramResponse.ok) {
      console.error("Telegram sendMessage failed", {
        status: telegramResponse.status,
        errorCode: telegramResult.error_code,
        description: telegramResult.description,
      });

      response.status(502).json({
        message: "Заявка не отправилась. Попробуйте ещё раз",
      });
      return;
    }

    response.status(200).json({ ok: true });
  } catch (error) {
    console.error("Telegram request failed", {
      message: error instanceof Error ? error.message : String(error),
    });

    response.status(500).json({
      message: "Не получилось отправить заявку",
    });
  }
}
