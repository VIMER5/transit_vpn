import Joi from "joi";

export const authRequestSchema = Joi.object({
  initData: Joi.string()
    .min(10)
    .max(6000)
    .pattern(/^[\w%.\-=&]+$/)
    .required()
    .messages({
      "string.empty": "initData обязательна",
      "any.required": "initData обязательна",
      "string.pattern.base": "Неверные данные",
      "string.max": "Неверные данные",
      "string.min": "Неверные данные",
    }),
});
