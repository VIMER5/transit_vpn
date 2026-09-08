import os from "os";
import { config } from "../../config.js";
import chalk from "chalk";

interface interfacesItem {
  name: string;
  ip: string;
  teg: string;
}

function getNetworkAddress(): interfacesItem[] {
  const AllInterfaces = os.networkInterfaces();
  let interfaces: interfacesItem[] = [{ name: "local", ip: "localhost", teg: "local" }];
  for (const name of Object.keys(AllInterfaces)) {
    if (AllInterfaces[name]) {
      for (const iface of AllInterfaces[name]) {
        if (iface.family === "IPv4" && !iface.internal) {
          interfaces.push({ name: name, ip: iface.address, teg: "Network" });
        }
      }
    }
  }
  return interfaces;
}
function printServerStarted(startTime: number) {
  const env = config.isDev ? "development" : "production";
  const nodeVer = process.version;
  const ip: string | interfacesItem[] = config.server.IP != "0.0.0.0" ? config.server.IP : getNetworkAddress();
  const port = config.server.port;
  const duration = Date.now() - startTime;
  console.log(`
  ${chalk.green.bold("🚀 СЕРВЕР УСПЕШНО ЗАПУЩЕН")}

${chalk.green("➜")}  ${chalk.bold("Окружающая среда")} : ${chalk.yellow(env)} ${chalk.gray(`[Node ${nodeVer}]`)}`);
  if (typeof ip == "string") {
    console.log(`
  ${chalk.green("➜")}  ${chalk.bold("Network")}          : ${chalk.cyan(`http://${ip}:${port}/`)}
    `);
  } else {
    for (const item of ip) {
      console.log(
        `${chalk.green("➜")}  ${chalk.bold(item.teg)}          : ${chalk.cyan(`http://${item.ip}:${port}/`)} ${chalk.gray(item.name)}`,
      );
    }
  }
  if (config.swagger) {
    console.log(`
${chalk.gray("🛠  Инструменты:")}
${chalk.green("➜")}  ${chalk.bold("Swagger UI")} : ${chalk.cyan(`http://localhost:${port}/api-docs`)}`);
  }
  console.log(`
${chalk.green("⚡ Запустился за:")} ${chalk.gray(`${duration}ms`)} `);
}
export { printServerStarted };
