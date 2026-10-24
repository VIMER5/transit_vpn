import { randomBytes } from "node:crypto";
import type { Response } from "express";

const BRAND = "Transit LAB";
interface data {
  status: "active" | "expired";
  subUrl: string;
  expiresAt: Date;
}
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function sendBrowserStubSub(res: Response, data: data) {
  const nonce = randomBytes(16).toString("base64");
  const url = esc(data.subUrl);

  res.status(200).set({
    "content-type": "text/html; charset=utf-8",
    "cache-control": "no-store",
    "x-robots-tag": "noindex, nofollow",
    "referrer-policy": "no-referrer",
    "content-security-policy": `default-src 'none'; style-src 'nonce-${nonce}'; script-src 'nonce-${nonce}'; base-uri 'none'; form-action 'none'`,
  }).send(`<!doctype html>
<html lang="ru">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${BRAND}</title>
<style nonce="${nonce}">
  body{margin:0;background:#0F1420;color:#EDEFF3;font:16px/1.55 system-ui,sans-serif}
  main{max-width:440px;margin:0 auto;padding:12vh 20px 40px}
  h1{font-size:20px;margin:0 0 8px}
  p{color:#8B93A7;margin:0 0 20px}
  
  /* Стили для блока статуса подписки */
  .status-card{background:#171F30;border:1px solid #2A3548;border-radius:10px;padding:14px;margin-bottom:20px;font-size:14px}
  .status-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
  .status-row:last-child{margin-bottom:0}
  .label{color:#8B93A7}
  .value{font-weight:600;color:#EDEFF3}
  .badge{display:inline-block;padding:3px 8px;border-radius:6px;font-size:12px;font-weight:600}
  .badge.active{background:#1B382B;color:#4ADE80;border:1px solid #22543D}
  .badge.expired{background:#3B1D22;color:#F87171;border:1px solid #5C2329}

  ol{padding-left:20px;margin:0 0 24px} li{margin-bottom:8px}
  .url{display:block;word-break:break-all;background:#171F30;border:1px solid #2A3548;border-radius:10px;
       padding:12px;font:13px ui-monospace,monospace;color:#C9A15A;margin-bottom:12px}
  .row{display:flex;gap:10px;flex-wrap:wrap}
  a,button{flex:1;min-width:140px;text-align:center;padding:12px;border-radius:12px;font:600 14px system-ui;
           text-decoration:none;cursor:pointer;border:1px solid #2A3548;background:#1D2740;color:#EDEFF3}
  .primary{background:#C9A15A;border-color:#C9A15A;color:#1A1200}
</style>
<main>
  <h1>Ссылка для VPN-приложения</h1>
  <p>Это ссылка подписки. В браузере она не работает, её нужно добавить в приложение.</p>
  
  <div class="status-card">
    <div class="status-row">
      <span class="label">Статус:</span>
      <span class="value"><span class="badge ${data.status}">${data.status}</span></span>
    </div>
    <div class="status-row">
      <span class="label">Действует до:</span>
      <span class="value">${data.expiresAt}</span>
    </div>
  </div>

  <ol>
    <li>Установите Happ или INCY.</li>
    <li>Нажмите кнопку ниже: приложение откроется и добавит подписку. Либо скопируйте ссылку и вставьте её в приложении вручную.</li>
    <li>Если приложение пишет, что подписка недоступна, включите в его настройках отправку идентификатора устройства (HWID).</li>
  </ol>
  <code class="url" id="url">${url}</code>
  <div class="row">
    <a class="primary" href="happ://add/${url}">Открыть в Happ</a>
    <a href="incy://add/${url}">Открыть в INCY</a>
    <button id="copy">Скопировать ссылку</button>
  </div>
</main>
<script nonce="${nonce}">
  document.getElementById("copy").addEventListener("click", async (e) => {
    try {
      await navigator.clipboard.writeText(document.getElementById("url").textContent);
      e.target.textContent = "Скопировано";
    } catch { e.target.textContent = "Выделите ссылку вручную"; }
  });
</script>
</html>`);
}
