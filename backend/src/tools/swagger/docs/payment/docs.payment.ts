export const paymentPaths = {
  "/api/payment/history": {
    post: {
      summary: "История операций",
      tags: ["Payment"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/historyRequest" },
          },
        },
      },
      responses: {
        200: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/historyResponse" },
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
