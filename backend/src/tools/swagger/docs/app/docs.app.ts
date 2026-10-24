export const appPaths = {
  "/api/app/PayLoad": {
    get: {
      summary: "полезная нагрузка приложения",
      tags: ["App"],
      responses: {
        200: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/appPayLoad" },
            },
          },
        },
      },
    },
  },
};
