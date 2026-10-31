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
              schema: { $ref: "#/components/schemas/SubInfo" },
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
  "/api/sub/rotateSubUuid": {
    patch: {
      summary: "Перевыпустить UUID подписки пользователя",
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
              schema: { $ref: "#/components/schemas/rotateUuidSubResponse" },
            },
          },
        },
        404: {
          description: "Подписка не найдена",
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
              schema: { $ref: "#/components/schemas/SubInfo" },
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
  "/api/sub/upgrade": {
    patch: {
      summary: "Изменить число устройств или срока в активной подписке",
      description:
        "Сервер всегда списывает собственный расчёт; если он выше, чем expectedPriceKopecks, возвращается 409 и ничего не списывается. \n\nВ этом запросе есть два кейса работы: \n1) обновление устройств; \n2) продление срока подписки",
      tags: ["Sub"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/upgradeRequest" },
          },
        },
      },
      responses: {
        "200": {
          description: "Число устройств изменено",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/upgradeResponse" },
            },
          },
        },
        "400": {
          description: "Некорректные данные или превышено максимальное число устройств",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/error" },
              example: {
                error: { code: "sub_DeviceLimitExceeded", message: "Превышено максимальное число устройств" },
              },
            },
          },
        },
        "401": {
          description: "Unauthorized",
          content: { "application/json": { schema: { $ref: "#/components/schemas/error" } } },
        },
        "402": {
          description: "Недостаточно средств на балансе",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/error" },
              example: { error: { code: "Payment_InsufficientBalanceError", message: "Недостаточно средств" } },
            },
          },
        },
        "403": {
          description: "Подписка не активна",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/error" },
              example: { error: { code: "sub_NotActive", message: "Подписка не активна" } },
            },
          },
        },
        "404": {
          description: "Подписка пользователя не найдена",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/error" },
              example: { error: { code: "sub_NotFound", message: "Подписка не найдена" } },
            },
          },
        },
        "409": {
          description:
            "Конфликт. sub_priceChanged: цена выросла с момента расчёта. sub_NothingToUpgrade: запрошенное число устройств равно текущему лимиту.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/error" },
              example: { error: { code: "sub_priceChanged", message: "Стоимость изменилась" } },
            },
          },
        },
      },
    },
  },
  "/api/sub/upgrade/quote": {
    get: {
      summary: "Рассчитать стоимость изменения числа устройств в активной подписке",
      description:
        "Ничего не списывает. Стоимость считается от остатка срока подписки: ставка за устройство в месяц x добавляемые устройства x оставшиеся дни / 30. При уменьшении числа устройств стоимость равна 0, возврат не выполняется.",
      tags: ["Sub"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "query",
          name: "deviceCount",
          required: true,
          description: "Желаемое итоговое число устройств. Максимум задаётся в /api/plans/pricing (max_device).",
          schema: { type: "integer", minimum: 1 },
          example: 5,
        },
      ],
      responses: {
        "200": {
          description: "Расчёт выполнен",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/upgradeQuoteResponse" },
            },
          },
        },
        "400": {
          description: "Некорректные данные или превышено максимальное число устройств",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/error" },
              example: {
                error: { code: "sub_DeviceLimitExceeded", message: "Превышен лимит устройства" },
              },
            },
          },
        },
        "401": {
          description: "Unauthorized",
          content: { "application/json": { schema: { $ref: "#/components/schemas/error" } } },
        },
        "403": {
          description: "Подписка не активна",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/error" },
              example: { error: { code: "sub_NotActive", message: "Подписка не активна" } },
            },
          },
        },
        "404": {
          description: "Подписка пользователя не найдена",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/error" },
              example: { error: { code: "sub_NotFound", message: "Подписка не найдена" } },
            },
          },
        },
        "409": {
          description: "Нечего менять: запрошенное число устройств совпадает с текущим лимитом",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/error" },
              example: { error: { code: "sub_NothingToUpgrade", message: "Число устройств не изменилось" } },
            },
          },
        },
      },
    },
  },
};
