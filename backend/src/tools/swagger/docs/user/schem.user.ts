export const user_schema = {
  BalanceUserResponse: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "bigInt",
      },
      balance: {
        type: "number",
        description: "баланс пользователя(в копейках)",
      },
    },
  },
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
      trial_period: {
        type: "boolean",
        description: "Выдавался ли пробный период у пользователя",
      },
      balance: {
        type: "number",
        description: "баланс пользователя(в копейках)",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  CurrentStatisticsUserReferral: {
    type: "object",
    properties: {
      referral_code: {
        type: "string",
        description: "реф. код пользователя",
      },
      referralsCount: {
        type: "number",
        description: "кол-во приглашенных",
      },
      sumReferralsBonus: {
        type: "number",
        description: "сумма боносов от реф.(в копейках)",
      },
      url: {
        type: "string",
        description: "Ссылка для приглашений",
      },
    },
  },
};
