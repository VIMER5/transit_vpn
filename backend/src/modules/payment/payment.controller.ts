import { CustomRequest } from "../../shared/types/customRequest.type.js";
import { Response, NextFunction } from "express";
import paymentService from "./payment.service.js";
class paymentController {
  async test(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      let data;
      if (req.body.type == "topup")
        data = await paymentService.creditBalance(req.userId!, req.body.amount, { type: "topup" });
      else data = await paymentService.debitBalance(req.userId!, req.body.amount, { type: "purchase" });
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
  async history(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const data = await paymentService.getUserHistory(req.userId!, req.body.offset, req.body.limit);
      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
}

export default new paymentController();
