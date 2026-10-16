import { CustomRequest } from "../../shared/types/customRequest.type.js";
import { Response, NextFunction, Request } from "express";
import subscriptionsService from "./subscriptions.service.js";
import { sendBrowserStubSub } from "../../shared/pages/browserStubSub.js";
import { sendBrowserNotFound } from "../../shared/pages/notFound.js";
import { config } from "../../config.js";
class subController {
  async purchase(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const data = await subscriptionsService.purchaseSubscription({ userID: req.userId!, ...req.body });
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
  async getCurrentSub(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const data = await subscriptionsService.getCurrentUserSub(req.userId!);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
  async returnSubByUUID(req: Request, res: Response, next: NextFunction) {
    try {
      const uuidSub = String(req.params.sub_uuid ?? "");
      const sub = await subscriptionsService.getSubByUuid(uuidSub);
      if (!sub) return sendBrowserNotFound(res);
      const ua = req.header("user-agent") ?? "";
      const Hwid = req.header("x-hwid") ?? null;
      const isVpnClient = ua.includes("INCY") || ua.includes("Happ");
      if (!isVpnClient)
        return sendBrowserStubSub(res, {
          expiresAt: sub.expires_at,
          status: sub.status,
          subUrl: `https://${config.domain.domainServer}/${sub.sub_uuid}`,
        });
      console.log(ua + " " + Hwid);
      res.status(200).json("sub");
    } catch (e) {
      next(e);
    }
  }
  async trials(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const data = await subscriptionsService.trials(req.userId!);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
}

export default new subController();
