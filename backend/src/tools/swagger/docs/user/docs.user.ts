export const UserPaths = {
  "/api/users/": {
    get: {
      summary: "Информация о пользователе",
      tags: ["User"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CurrentUserInfoResponse" },
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
  "/api/users/balance": {
    get: {
      summary: "Информация о балансе пользователя",
      tags: ["User"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BalanceUserResponse" },
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
  "/api/referral_statistics/": {
    get: {
      summary: "Информация о партнёрской программе пользователя",
      tags: ["User"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CurrentStatisticsUserReferral" },
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
