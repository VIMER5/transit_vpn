export const Sub_schema = {
  DeviceInfo: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      agent: {
        type: "string",
        enum: ["INCY", "Happ"],
      },
      deviceName: {
        type: "string",
      },
      os: {
        type: "string",
      },
      createdAt: {
        format: "date-time",
      },
    },
  },
  deviceLimitsResponse: {
    type: "object",
    properties: {
      deviceLimitSub: {
        type: "number",
      },
      countDivice: {
        type: "number",
      },
    },
  },
  InfoDeviceInSubResponse: {
    type: "array",
    items: {
      $ref: "#/components/schemas/DeviceInfo",
    },
  },
  rotateUuidSubResponse: {
    type: "object",
    properties: {
      sub_uuid: {
        type: "string",
        description: "Новый UUID подписки",
      },
    },
  },
  InfoCurrentUserSubResponse: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "UserID (bigInt)",
      },
      sub: {
        $ref: "#/components/schemas/SubInfo",
      },
    },
  },
  SubInfo: {
    type: "object",
    properties: {
      id: {
        type: "number",
      },
      sub_uuid: {
        type: "string",
        description: "UUID подписки",
      },
      device_limit: {
        type: "number",
        description: "Кол-во устройств в подписке",
      },
      price_paid_kopecks: {
        type: "number",
        description: "Цена покупки",
      },
      discount: {
        type: "number",
        description: "Скидка при покупки",
      },
      term_months: {
        type: "number",
        description: "кол-во мес при покопки",
      },
      expires_at: {
        type: "string",
        format: "date-time",
      },
      status: {
        type: "string",
        enum: ["active", "expired"],
      },
      isTrials: {
        type: "boolean",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
    },
  },
  subPurchaseRequest: {
    type: "object",
    description: "Покупка с произвольными параметрами",
    properties: {
      custom: {
        type: "object",
        properties: {
          deviceCount: {
            type: "number",
            description: "Кол-во устройств в подписке",
          },
          periodId: {
            type: "number",
            description: "ID периода подписки",
          },
        },
      },
    },
    required: ["custom"],
  },
  upgradeQuoteResponse: {
    type: "object",
    properties: {
      currentLimit: {
        type: "number",
      },
      newLimit: {
        type: "number",
      },
      differenceDevices: {
        type: "number",
      },
      daysLeft: {
        type: "number",
      },
      priceKopecks: {
        type: "number",
      },
    },
  },
  upgradeRequest: {
    type: "object",
    required: ["deviceUpgrade"],
    properties: {
      deviceUpgrade: {
        type: "object",
        required: ["deviceCount", "expectedPriceKopecks"],
        properties: {
          deviceCount: {
            type: "number",
            minimum: 1,
            maximum: 100,
            description: "Желаемое итоговое число устройств",
          },
          expectedPriceKopecks: {
            type: "integer",
            minimum: 0,
            description:
              "Максимальная цена в копейках, которую пользователь согласен заплатить. Берётся из priceKopecks последнего ответа /api/sub/upgrade/quote. Сервер спишет не эту сумму, а свой актуальный расчёт, если он не выше.",
          },
        },
      },
    },
    example: {
      deviceUpgrade: { deviceCount: 5, expectedPriceKopecks: 23000 },
    },
  },
  upgradeResponse: {
    type: "object",
    properties: {
      sub: { $ref: "#/components/schemas/SubInfo" },
      chargedKopecks: {
        type: "number",
        description:
          "Сколько реально списано с баланса (в копейках). Может быть меньше expectedPriceKopecks, если день сменился между расчётом и покупкой",
      },
    },
  },
};
