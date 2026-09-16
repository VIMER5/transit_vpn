import { Setting } from "./infrastructure/database/models/settings.model.js";
export async function getSetting(key: string): Promise<string | null> {
  const setting = await Setting.findByPk(key);
  return setting ? setting.value : null;
}
export async function setSetting(key: string, value: string): Promise<void> {
  await Setting.upsert({ key, value });
}
