import { config } from "../../../config.js";
import { BotContext } from "../../../infrastructure/telegram/bot.js";
export async function isAdmin(ctx: BotContext, next: () => Promise<void>) {
  if (ctx.from && config.tg.adminsID.includes(ctx.from.id)) {
    return await next();
  }
  await ctx.reply("⛔ У вас нет прав для выполнения этой команды.");
}
