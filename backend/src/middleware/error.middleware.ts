import { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/errors/app.error.js";
import { config } from "../config.js";

export default function (error: Error | AppError, req: Request, res: Response, next: NextFunction) {
  if (config.isDev) console.log(error);
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
      },
    });
  } else {
    if (config.isProd) console.log(error);
    res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Мой код решил, что сегодня выходной.",
      },
    });
  }
}
