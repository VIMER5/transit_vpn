import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { AppError } from "../shared/errors/app.error.js";

export default function validation(schema: ObjectSchema, source: source = "body") {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req[source]) {
      next(new AppError("validation_failed", 400, `${source} обязательный`));
    }
    const { error, value } = schema.validate(req[source], {
      abortEarly: true,
      stripUnknown: true,
    });
    if (error) {
      next(new AppError("validation_failed", 400, error.message));
    }
    req[source] = value;
    next();
  };
}

type source = "body" | "params";
