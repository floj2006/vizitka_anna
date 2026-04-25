# Лендинг Анны Гатауллиной

Одностраничный React + Vite сайт-визитка для ведущей событий.

## Локальный запуск

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
npm run preview
```

## Публикация на Vercel

1. Импортируйте проект в Vercel как `Vite`-приложение.
2. Команда сборки: `npm run build`
3. Output directory: `dist`
4. Добавьте переменные окружения для отправки заявок в Telegram.

## Заявки в Telegram

Форма отправляет данные на serverless endpoint `api/telegram.js`.

Нужные переменные окружения:

```env
TELEGRAM_BOT_TOKEN=123456789:your_bot_token
TELEGRAM_CHAT_ID=123456789
```

Как настроить:

1. Создайте бота через `@BotFather` и возьмите `TELEGRAM_BOT_TOKEN`.
2. Напишите любое сообщение созданному боту.
3. Узнайте chat id через `https://api.telegram.org/bot<token>/getUpdates`.
4. Добавьте `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` в Vercel Project Settings -> Environment Variables.
5. Перезапустите деплой.

## Что обновить позже

- При необходимости заменить `og-cover.jpg` на финальное превью под публикацию
