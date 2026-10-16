export const Sub_schema = {
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
      plan_title: {
        type: "string",
        description: "Название подписки",
      },
      device_limit: {
        type: "number",
        description: "Кол-во устройств в подписке",
      },
      expires_at: {
        type: "string",
        format: "date-time",
      },
      status: {
        type: "string",
        enum: ["active", "expired"],
      },
    },
  },
  fullSubInfo: {
    allOf: [
      { $ref: "#/components/schemas/SubInfo" },
      {
        type: "object",
        properties: {
          plan_id: {
            type: "number",
            description: "ID плана, от которого получили подписку.",
          },
          price_paid_kopecks: {
            type: "number",
            description: "Цена покупки",
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
    ],
  },
  subPurchaseRequest: {
    oneOf: [
      {
        type: "object",
        description: "Вариант 1: Покупка по ID плана",
        properties: {
          planId: {
            type: "string",
            description: "ID плана",
          },
        },
        required: ["planId"],
      },
      {
        type: "object",
        description: "Вариант 2: Покупка с произвольными параметрами",
        properties: {
          custom: {
            type: "object",
            properties: {
              deviceCount: {
                type: "number",
                description: "Кол-во устройств в подписке",
              },
              durationMonths: {
                type: "number",
                description: "На сколько месяцев купить.",
              },
            },
          },
        },
        required: ["custom"],
      },
    ],
  },
};
