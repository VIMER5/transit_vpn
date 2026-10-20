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
  "/api/sub/device/": {
    get: {
      summary: "Получить информацию об устройствах текущего пользователя.",
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
              schema: { $ref: "#/components/schemas/InfoDeviceInSubResponse" },
            },
          },
        },
        404: {
          description: "что-то не найдено",
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
  "/api/sub/device/limits": {
    get: {
      summary: "Получить информацию об лимитах устройств текущего пользователя.",
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
              schema: { $ref: "#/components/schemas/deviceLimitsResponse" },
            },
          },
        },
        404: {
          description: "что-то не найдено",
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
  "/api/sub/device/deauthorize": {
    delete: {
      summary: "Удалить устройство из подписки по ID",
      tags: ["Sub"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                deviceId: {
                  type: "number",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          content: {
            "application/json": {
              schema: { type: "boolean" },
            },
          },
        },
        404: {
          description: "что-то не найдено",
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
  "/api/sub/trials": {
    get: {
      summary: "Получить пробный период",
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
              schema: { $ref: "#/components/schemas/SubInfo" },
            },
          },
        },
        403: {
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
  "/api/sub/purchase": {
    post: {
      summary: "Покупка подписки",
      tags: ["Sub"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/subPurchaseRequest" },
          },
        },
      },
      responses: {
        200: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/fullSubInfo" },
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
