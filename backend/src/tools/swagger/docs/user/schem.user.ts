export const user_schema = {
  CurrentUserInfoResponse: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "bigInt",
      },
      tg_id: {
        type: "string",
        description: "bigInt tg ID",
      },
      first_name: {
        type: "string",
        description: "имя пользователя",
      },
      last_name: {
        type: "string",
        description: "фамилия пользователя",
      },
      username: {
        type: "string",
        description: "username tg",
      },
      photo_url: {
        type: "string",
        description: "URL авы с тг",
      },
      referral_code: {
        type: "string",
        description: "реф код",
      },
      referred_by_id: {
        type: "string",
        description: "ID пользователя который пригласил(bigInt)",
      },
      status: {
        type: "string",
        description: "статус аккаунта",
        enum: ["active", "banned"],
      },
      balance: {
        type: "number",
        description: "баланс пользователя",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },
};
