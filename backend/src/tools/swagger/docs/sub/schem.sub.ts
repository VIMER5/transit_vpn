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
};
