import { NextFunction, Request, Response } from "express";
import authService from "./auth.service.js";

class authController {
  async authTelegramMiniApp(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await authService.authTelegram(req.body.initData);
      return res.status(200).json({ accessToken: data.accessToken });
    } catch (e) {
      next(e);
    }
  }
}

export default new authController();
