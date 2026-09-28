import Joi from "joi";

export const historyRequestSchema = Joi.object({
  offset: Joi.number().integer().min(0).required(),
  limit: Joi.number().integer().min(1).max(20).required(),
});
