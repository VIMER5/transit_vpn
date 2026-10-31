import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { AppError } from "../shared/errors/app.error.js";
import { sendBrowserNotFound } from "../shared/pages/notFound.js";
import { CustomRequest } from "../shared/types/customRequest.type.js";

export default function validation(schema: ObjectSchema, source: source = "body", returnNotFound: boolean = false) {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req[source]) {
      next(new AppError("validation_failed", 400, `${source} обязательный`));
    }
    const { error, value } = schema.validate(req[source], {
      abortEarly: true,
      stripUnknown: true,
    });
    if (error) {
      if (!returnNotFound) return next(new AppError("validation_failed", 400, error.message));
      else return sendBrowserNotFound(res);
    }
    if (source == "query") req.validatedQuery = value;
    else req[source] = value;
    next();
  };
}

type source = "body" | "params" | "query";
