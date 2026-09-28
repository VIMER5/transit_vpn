import Joi from "joi";

export const purchaseRequestSchema = Joi.object({
  planId: Joi.number().integer().positive(),
  custom: Joi.object({
    deviceCount: Joi.number().integer().min(1).max(10).required(),
    durationMonths: Joi.number().integer().min(1).required(),
  }),
}).xor("planId", "custom");
