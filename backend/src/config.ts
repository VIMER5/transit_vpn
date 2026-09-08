import Joi from "joi";

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().valid("dev", "prod").default("prod"),
  swagger: Joi.boolean().default(false),
  PORT: Joi.number().default(3030),
  IP: Joi.string().default("0.0.0.0"),
  botTgToken: Joi.string().min(20).max(80).required(),

  domainWeb: Joi.string().required(),

  db_DataBaseName: Joi.string().required(),
  db_host: Joi.string().required(),
  db_port: Joi.number().default(5432),
  db_login: Joi.string().required(),
  db_pass: Joi.string().required(),

  token_accessSecretKey: Joi.string().required(),
  ttl_ACCESS_TOKEN: Joi.number().default(86400),
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Ошибка конфигурации сервера: ${error.message}`);
}
export const config = {
  isDev: envVars.NODE_ENV === "dev",
  isProd: envVars.NODE_ENV === "prod",
  swagger: envVars.swagger,
  server: {
    port: envVars.PORT,
    IP: envVars.IP,
  },
  domain: {
    domainWeb: envVars.domainWeb,
  },
  tg: {
    botToken: envVars.botTgToken,
  },
  db: {
    name: envVars.db_DataBaseName,
    host: envVars.db_host,
    port: envVars.db_port,
    login: envVars.db_login,
    pass: envVars.db_pass,
  },
  jwt: {
    accessSecretKey: envVars.token_accessSecretKey,
    ttl_ACCESS: envVars.ttl_ACCESS_TOKEN,
  },
};
