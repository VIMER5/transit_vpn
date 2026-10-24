import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { Express } from "express";
import { app_schema } from "./docs/app/app.schema.js";
import { authPaths } from "./docs/auth/docs.auth.js";
import { auth_schema } from "./docs/auth/schem.auth.js";
import { UserPaths } from "./docs/user/docs.user.js";
import { user_schema } from "./docs/user/schem.user.js";
import { PlansPaths } from "./docs/plans/docs.plans.js";
import { plans_schema } from "./docs/plans/schem.plans.js";
import { payment_schema } from "./docs/payment/schem.payment.js";
import { paymentPaths } from "./docs/payment/docs.payment.js";
import { SubPaths } from "./docs/sub/docs.sub.js";
import { Sub_schema } from "./docs/sub/schem.sub.js";
import { appPaths } from "./docs/app/docs.app.js";
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description: "Документация Transit API",
      contact: {
        name: "Поддержка",
        url: "https://t.me/The_crazy_fun",
      },
    },
    servers: [
      {
        url: `http://localhost:${3030}`,
        description: "Dev server",
      },
    ],
    paths: {
      ...appPaths,
      ...authPaths,
      ...UserPaths,
      ...PlansPaths,
      ...paymentPaths,
      ...SubPaths,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Введите токен без слова 'Bearer'",
        },
      },
      schemas: {
        ...app_schema,
        ...auth_schema,
        ...user_schema,
        ...plans_schema,
        ...payment_schema,
        ...Sub_schema,
      },
      responses: {},
    },
    tags: [
      {
        name: "App",
        description: "Операции приложения",
      },
      {
        name: "Auth",
        description: "Операции аутентификации и авторизации",
      },
      {
        name: "User",
        description: "Операции с пользователем",
      },
      {
        name: "Plans",
        description: "Операции с планами",
      },
      {
        name: "Payment",
        description: "Операции с балансом",
      },
      {
        name: "Sub",
        description: "Операции с подпиской",
      },
    ],
  },
  apis: [path.join(process.cwd(), "index.js"), path.join(process.cwd(), "dist/index.js")],
};
const swaggerSpec = swaggerJsdoc(options);
export const setupSwagger = (app: Express): void => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    }),
  );

  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Инициализация Swagger завершена`);
};
