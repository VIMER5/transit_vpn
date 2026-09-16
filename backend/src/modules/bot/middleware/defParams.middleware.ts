import { BotContext } from "../../../infrastructure/telegram/bot.js";
export async function defParams(ctx: BotContext, next: () => Promise<void>) {
  ctx.session.isWaitingForPhoto = false;
  return await next();
}
