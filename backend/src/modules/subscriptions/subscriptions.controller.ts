import { CustomRequest } from "../../shared/types/customRequest.type.js";
import { Response, NextFunction } from "express";
import subscriptionsService from "./subscriptions.service.js";
import SubError from "../../shared/errors/sub.error.js";
import plansService from "../plans/plans.service.js";

class subController {
  async purchase(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const data = await subscriptionsService.purchaseSubscription({ userID: req.userId!, ...req.body });
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
  async getUserCurrentSub(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const data = await subscriptionsService.getSubById(req.subId!);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
  async rotateUserUuidSub(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const data = await subscriptionsService.rotateSubUuid(req.subId!);
      res.status(200).json({ sub_uuid: data });
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

  async quote(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const sub = await subscriptionsService.getSubById(req.subId!);
      if (!sub) throw SubError.subNotFound();
      const Pricing = await plansService.getPricing();
      const data = subscriptionsService.quoteDeviceUpgrade(sub, Pricing, req.validatedQuery.deviceCount);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
  async upgrade(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      let data;
      if (body.deviceUpgrade) {
        const userInput = body.deviceUpgrade;
        data = await subscriptionsService.userDeviceUpgrade(
          req.userId!,
          userInput.deviceCount,
          userInput.expectedPriceKopecks,
        );
      }

      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
}

export default new subController();
