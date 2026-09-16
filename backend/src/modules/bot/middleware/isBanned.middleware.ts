import { BotContext } from "../../../infrastructure/telegram/bot.js";
import userService from "../../users/user.service.js";
import global from "../global.js";
export async function isBanned(ctx: BotContext, next: () => Promise<void>) {
  if (!ctx.from) return;
  const user = await userService.userFindByTgID(BigInt(ctx.from.id));
  if (!user) return await next();
  if (user && user.status == "banned")
    return global.SendWithPhoto(ctx, { content: "🚫 Ваш аккаунт заблокирован", namePhoto: "error_photo_id" });
  return await next();
}
