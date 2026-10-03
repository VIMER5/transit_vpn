export const SubPaths = {
  "/api/sub/": {
    get: {
      summary: "Получить информацию о подписке текущего пользователя.",
      tags: ["Sub"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/InfoCurrentUserSubResponse" },
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
