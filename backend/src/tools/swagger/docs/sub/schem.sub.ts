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
};
