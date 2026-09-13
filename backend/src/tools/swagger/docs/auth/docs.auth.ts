export const authPaths = {
  "/api/auth/miniapp": {
    post: {
      summary: "авторизация через TG",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/authMiniappRequest" },
          },
        },
      },
      responses: {
        200: {
          description: "Пользователь успешно зарегистрирован",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/authMiniappResponse" },
            },
          },
        },
        400: {
          description: "Некорректные данные",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/error" },
            },
          },
        },
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/error" },
            },
          },
        },
      },
    },
  },
};
