import express from "express";
import chalk from "chalk";
import { config } from "./config.js";
import cors from "cors";
import router from "./routes/routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import { connection } from "./infrastructure/database/index.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "https://web.vape-horizont.ru", credentials: true }));

app.use(router);
app.use(errorMiddleware);

await connection();

app.listen(config.server.port, config.server.IP, () => {
  console.log(`сервер готов к работает: http://${config.server.IP}:${config.server.port}/`);
  if (config.isDev) {
    console.log(chalk.red.bold("Сервер запущен в режиме разработки!!!"));
    console.log(chalk.red.bold("Сервер запущен в режиме разработки!!!"));
    console.log(chalk.red.bold("Сервер запущен в режиме разработки!!!"));
  }
});
