import { Sequelize } from "sequelize";
import { models, setupAssociations } from "./init.models.js";
import { config } from "../../config.js";
import { seedPricingDefaults } from "./seed.js";

const db = new Sequelize(config.db.name, config.db.login, config.db.pass, {
  host: config.db.host,
  port: config.db.port,
  dialect: "postgres",
  logging: false,
});

async function initModels() {
  for (const model of models) {
    model.initModel(db);
    console.log(`Модель ${model.name} инициализирована`);
  }
  setupAssociations();
  console.log("Связи моделей настроены");
}

export async function connection() {
  try {
    await initModels();
    await db.authenticate();

    console.log("Успешное подключение к БД, начинаю синхронизацию моделей.");
    await db.sync({ alter: true });
    console.log(`Процесс синхронизации моделей прошёл успешно.`);
    await seedPricingDefaults();
    console.log("Сидирование завершено.");
  } catch (err) {
    console.log(err);
    process.exit();
  }
}
