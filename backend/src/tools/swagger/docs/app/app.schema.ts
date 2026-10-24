export const app_schema = {
  error: {
    type: "object",
    properties: {
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
    },
  },
  appPayLoad: {
    type: "object",
    properties: {
      useTgBot: {
        type: "string",
      },
      urlSupport: {
        type: "string",
      },
      subURL: {
        type: "string",
      },
    },
  },
};
