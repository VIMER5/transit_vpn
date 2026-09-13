export const auth_schema = {
  authMiniappResponse: {
    type: "object",
    properties: {
      accessToken: {
        type: "string",
        description: "JWT токен доступа",
      },
    },
  },
  authMiniappRequest: {
    type: "object",
    properties: {
      initData: {
        type: "string",
        description: "initData tg",
      },
    },
  },
};
