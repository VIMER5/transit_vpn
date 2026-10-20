import Joi from "joi";

export const deauthorizeDeviceRequestSchema = Joi.object({
  deviceId: Joi.number().integer().positive().required(),
});
