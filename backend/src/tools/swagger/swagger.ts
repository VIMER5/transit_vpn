import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { Express } from "express";
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description: "Документация VoixChat API",
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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Введите токен без слова 'Bearer'",
        },
      },
      schemas: {},
      responses: {},
    },
    tags: [
      {
        name: "Auth",
        description: "Операции аутентификации и авторизации",
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
