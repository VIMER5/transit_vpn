export const plans_schema = {
  PublicTariffPlansResponse: {
    type: "array",
    items: {
      type: "object",
      properties: {
        id: {
          type: "number",
        },
        title: {
          type: "string",
          description: "Название тарифа.",
        },
        price_kopecks: {
          type: "number",
          description: "Цена тарифа в копейках",
        },
        duration_months: {
          type: "number",
          description: "Продолжительность в месяцах.",
        },
        device_limit: {
          type: "number",
          description: "Кол-во устройств",
        },
        accent: {
          type: "boolean",
        },
      },
    },
  },
  PricingResponse: {
    type: "object",
    properties: {
      device_month_rate_kopecks: {
        type: "number",
        description: "Стоимость одного устройства в месяц(в копейках).",
      },
      cost_month_kopecks: {
        type: "number",
        description: "Стоимость одного месяца(в копейках).",
      },
      max_month: {
        type: "number",
        description: "Максимальный период",
      },
      max_device: {
        type: "number",
        description: "Максимальное кол-во устройств",
      },
    },
  },
};
