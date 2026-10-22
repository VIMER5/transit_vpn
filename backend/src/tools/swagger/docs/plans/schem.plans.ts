export const plans_schema = {
  Periods: {
    type: "object",
    properties: {
      id: {
        type: "number",
      },
      months: {
        type: "number",
        description: "Срок периода",
      },
      discount_percent: {
        type: "number",
        description: "Процент скидки",
      },
      is_active: {
        type: "boolean",
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
      max_device: {
        type: "number",
        description: "Максимальное кол-во устройств",
      },
      SubPeriod: {
        type: "array",
        items: {
          $ref: "#/components/schemas/Periods",
        },
      },
    },
  },
};
