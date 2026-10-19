import { sendBrowserStubSub } from "../../shared/pages/browserStubSub.js";
import { sendBrowserNotFound } from "../../shared/pages/notFound.js";
import { config } from "../../config.js";
import { Response, NextFunction, Request } from "express";
import subscriptionsService from "../subscriptions/subscriptions.service.js";
import clientService from "./client.service.js";
import devicesService from "../devices/devices.service.js";

class clientController {
  async returnSubByUUID(req: Request, res: Response, next: NextFunction) {
    try {
      const uuidSub = String(req.params.sub_uuid ?? "");
      const sub = await subscriptionsService.getSubByUuid(uuidSub);
      if (!sub) return sendBrowserNotFound(res);
      const clientInfo = clientService.clientTypeDetection(req.headers);
      if (!clientInfo.isVpnClient)
        return sendBrowserStubSub(res, {
          expiresAt: sub.expires_at,
          status: sub.status,
          subUrl: `https://${config.domain.domainServer}/${sub.sub_uuid}`,
        });
      res.setHeader("hide-settings", "1");
      res.setHeader("content-type", "text/plain; charset=utf-8");
      res.setHeader("support-url", "https://t.me/sosentry");
      res.setHeader("subscription-userinfo", "upload=0; download=0; total=0; expire=0");
      res.setHeader("profile-update-interval", "1");
      res.setHeader("hide-url", "1"); // incy
      res.setHeader("profile-web-page-url", "https://t.me/sosentry");
      res.setHeader("profile-title", "SOSENTRY Error");
      if (sub.status === "expired") {
        const textError = "Ваша подписка истекла.";
        res.setHeader("announce", `base64:${Buffer.from(textError).toString("base64")}`);
        return res.send(errorMSG("🚨_Ваша подписка истекла."));
      }
      const guard = await devicesService.deviceGuard(sub.id, clientInfo);
      if (guard !== "ok") {
        const limit = guard === "limit";
        const text = limit
          ? "Вы достигли лимита устройств по подписке. Увеличить его можно в личном кабинете."
          : "Приложение не передаёт идентификатор устройства. Включите отправку HWID в его настройках.";
        res.setHeader("announce", `base64:${Buffer.from(text).toString("base64")}`);
        return res.send(errorMSG(limit ? "🚨_Лимит устройств достигнут" : "🚨_Включите_отправку_HWID"));
      }
      console.log(clientInfo);
      const links: string[] = [
        "#hide-settings=1",
        "vless://uuid@host:443?security=reality&...#user1",
        "vmess://eyJ2IjoyLC...",
      ];
      const joinedLinks = links.join("\n");
      const base64Data = Buffer.from(joinedLinks, "utf-8").toString("base64");

      res.setHeader("profile-title", "My VPN Service1");
      res.send(base64Data);
    } catch (e) {
      next(e);
    }
  }
}
function errorMSG(msg: string) {
  const error = `vless://e7693a07-d3f8-43a3-9b21-b7433baed480@0.0.0.0:1?encryption=none&security=none#${msg}`;
  return Buffer.from(error, "utf-8").toString("base64");
}

export default new clientController();
