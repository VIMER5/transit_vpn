import { pricingConfig } from "./models/pricingConfig.model.js";
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
