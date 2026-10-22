import Joi from "joi";

export const purchaseRequestSchema = Joi.object({
  custom: Joi.object({
    deviceCount: Joi.number().integer().min(1).max(10).required(),
    periodId: Joi.number().integer().min(1).required(),
  }).required(),
});

export const ParamsUUIDSchema = Joi.object({
  sub_uuid: Joi.string().guid({
    version: ["uuidv4"],
    wrapper: false,
  }),
});
