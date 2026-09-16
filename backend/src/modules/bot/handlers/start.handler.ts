import { InlineKeyboard } from "grammy";
import { BotContext } from "../../../infrastructure/telegram/bot.js";
import { newRef_TEXT, WELCOME_TEXT } from "../assets/text.js";
import GlobalFunctionBot from "../global.js";
import { config } from "../../../config.js";
import userService from "../../users/user.service.js";
export async function handleStart(ctx: BotContext) {
  const message = ctx.message;

  if (!message) return;
  const matchText = typeof ctx.match === "string" ? ctx.match : "";
  const refMatch = matchText.match(/^ref_([a-zA-Z0-9]+)$/);

  if (refMatch) {
    const referrerCod = refMatch[1];
    const currentUserId = BigInt(message.from.id);

    const userWhoInvited = await userService.getUserViaReferralCode(referrerCod);

    if (userWhoInvited && userWhoInvited.tg_id != currentUserId) {
      const currentUser = await userService.userFindByTgID(currentUserId);
      if (!currentUser) {
        await userService.createUser(currentUserId, userWhoInvited.tg_id);
        try {
          await ctx.api.sendMessage(
            userWhoInvited.tg_id.toString(),
            newRef_TEXT(message.from.first_name ?? message.from.username ?? "NN"),
            {
              parse_mode: "HTML",
            },
          );
        } catch (error) {
          console.error("Не удалось отправить уведомление рефералу:", error);
        }
      }
    }
  }
  const keyboard = new InlineKeyboard().webApp("Открыть Mini App", `https://${config.domain.domainWeb}/`);
  await GlobalFunctionBot.SendWithPhoto(ctx, { content: WELCOME_TEXT, namePhoto: "welcome_photo_id" }, keyboard);
}
