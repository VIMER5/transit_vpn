export const payment_schema = {
  historyResponse: {
    type: "array",
    items: {
      $ref: "#/components/schemas/itemHistory",
    },
  },
  itemHistory: {
    type: "object",
    properties: {
      amount_kopecks: {
        type: "number",
        description: "Сумма транзакции",
      },
      type: {
        type: "string",
        description: "Назначение транзакции",
        enum: ["topup", "purchase", "referral_bonus", "refund", "admin_adjustment"],
      },
      reference_id: {
        type: "number",
        description: "ID инициатора транзакции",
      },
      balance_after: {
        type: "number",
        description: "Баланс после транзакции",
      },
      note: {
        type: "string",
        description: "Описание транзакции",
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
    },
  },
  historyRequest: {
    type: "object",
    properties: {
      offset: {
        type: "number",
      },
      limit: {
        type: "number",
      },
    },
  },
};
