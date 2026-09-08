const startTime = Date.now();
import express from "express";
import chalk from "chalk";
import { config } from "./config.js";
import cors from "cors";
import router from "./routes/routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import { connection } from "./infrastructure/database/index.js";
import { setupSwagger } from "./tools/swagger/swagger.js";
import { printServerStarted } from "./tools/nameplate/nameplate.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: config.isProd ? `https://${config.domain.domainWeb}` : "*", credentials: true }));

if (config.swagger) setupSwagger(app);

app.use(router);
app.use(errorMiddleware);

await connection();

app.listen(config.server.port, config.server.IP, () => {
  printServerStarted(startTime);
  if (config.isDev) {
    console.log(chalk.red.bold("Сервер запущен в режиме разработки!!!"));
    console.log(chalk.red.bold("Сервер запущен в режиме разработки!!!"));
    console.log(chalk.red.bold("Сервер запущен в режиме разработки!!!"));
  }
});
