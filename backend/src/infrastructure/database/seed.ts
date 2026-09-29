import { pricingConfig } from "./models/pricingConfig.model.js";
import { Setting } from "./models/settings.model.js";
export async function seedPricingDefaults() {
  const plansCount = await pricingConfig.count();
  if (plansCount > 0) {
    console.log("pricing_config уже заполнен, пропускаю");
    return;
  }
  await pricingConfig.create({
    cost_month_kopecks: 10000,
    device_month_rate_kopecks: 5000,
    max_month: 12,
    max_device: 10,
  });
}

export async function seedDefaultsSettings() {
  const settings = await Setting.findAll({
    raw: true,
  });
  if (!findKey("useTgBot", settings)) await Setting.upsert({ key: "useTgBot", value: "StudentChallenge_bot" });
}

function findKey(Key: string, data: Setting[]) {
  for (const item of data) {
    if (item.key == Key) return true;
  }
  return false;
}
