import Joi from "joi";

export const purchaseRequestSchema = Joi.object({
  custom: Joi.object({
    deviceCount: Joi.number().integer().min(1).max(10).required(),
    periodId: Joi.number().integer().min(1).required(),
  }).required(),
});
