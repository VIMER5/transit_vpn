import type { Response } from "express";

export function sendBrowserNotFound(res: Response) {
  res.status(404).set({
    "content-type": "text/html; charset=utf-8",
    "cache-control": "no-store",
  }).send(`<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>404 — Страница не найдена</title>
  <style>
    body { background: #0f1420; color: #8b93a7; font-family: system-ui, sans-serif; display: flex; height: 100vh; margin: 0; align-items: center; justify-content: center; }
    .box { text-align: center; padding: 20px; }
    h1 { font-size: 48px; margin: 0; color: #edeff3; }
    p { margin-top: 10px; font-size: 16px; }
  </style>
</head>
<body>
  <div class="box">
    <h1>404</h1>
    <p>Запрашиваемый ресурс не найден или был перемещен.</p>
  </div>
</body>
</html>`);
}
