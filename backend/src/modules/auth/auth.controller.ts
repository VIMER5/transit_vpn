import { NextFunction, Request, Response } from "express";
import authService from "./auth.service.js";

class authController {
  async authTelegramMiniApp(req: Request, res: Response, next: NextFunction) {
    try {
      // console.log(req.body.initData);
      const data = await authService.authTelegram(req.body.initData);
      res.cookie("refreshToken", data.refreshToken, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: "lax",
        secure: true,
      });
      return res.status(200).json({ accessToken: data.accessToken });
    } catch (e) {
      next(e);
    }
  }
}

export default new authController();
