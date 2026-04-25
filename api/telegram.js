const MAX_FIELD_LENGTH = 900;

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

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
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

    if (!telegramResponse.ok) {
      response.status(502).json({
        message: "Заявка не отправилась. Попробуйте ещё раз",
      });
      return;
    }

    response.status(200).json({ ok: true });
  } catch {
    response.status(500).json({
      message: "Не получилось отправить заявку",
    });
  }
}
