import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { AppError } from "../shared/errors/app.error.js";
import { sendBrowserNotFound } from "../shared/pages/notFound.js";

export default function validation(schema: ObjectSchema, source: source = "body", returnNotFound: boolean = false) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req[source]) {
      next(new AppError("validation_failed", 400, `${source} обязательный`));
    }
    const { error, value } = schema.validate(req[source], {
      abortEarly: true,
      stripUnknown: true,
    });
    if (error) {
      if (!returnNotFound) next(new AppError("validation_failed", 400, error.message));
      else return sendBrowserNotFound(res);
    }
    req[source] = value;
    next();
  };
}

type source = "body" | "params";
