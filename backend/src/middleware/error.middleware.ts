import { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/errors/app.error.js";

export default function (error: Error | AppError, req: Request, res: Response, next: NextFunction) {
  console.log(error);
  error instanceof AppError
    ? res.status(error.statusCode).json({
        error: {
          code: error.code,
          message: error.message,
        },
      })
    : res.status(500).json({
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Мой код решил, что сегодня выходной.",
        },
      });
}
