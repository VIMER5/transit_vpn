import { CustomRequest } from "../../shared/types/customRequest.type.js";
import { Response, NextFunction } from "express";
import subscriptionsService from "./subscriptions.service.js";
class subController {
  async purchase(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const data = await subscriptionsService.purchaseSubscription({ userID: req.userId!, ...req.body });
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
}

export default new subController();
