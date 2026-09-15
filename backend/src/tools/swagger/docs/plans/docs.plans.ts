export const PlansPaths = {
  "/api/plans/": {
    get: {
      summary: "Получить публичные тарифные планы",
      tags: ["Plans"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PublicTariffPlansResponse" },
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
  "/api/plans/pricing": {
    get: {
      summary: "Получить ценообразование",
      tags: ["Plans"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PricingResponse" },
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
