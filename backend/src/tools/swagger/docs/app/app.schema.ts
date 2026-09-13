export const app_schema = {
  error: {
    type: "object",
    properties: {
      code: {
        type: "string",
        description: "специальный код ошибки",
      },
      message: {
        type: "string",
        description: "сообщение ошибки",
      },
    },
  },
};
