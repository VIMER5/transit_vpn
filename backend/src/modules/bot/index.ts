import bot from "../../infrastructure/telegram/bot.js";
import { defParams } from "./middleware/defParams.middleware.js";
import { handleStart } from "./handlers/start.handler.js";
import { isAdmin } from "./middleware/isAdmin.middleware.js";
import { messagePhoto, setPhoto } from "./handlers/setPhoto.handler.js";
import { isBanned } from "./middleware/isBanned.middleware.js";

export function initBotHandlers() {
  bot.command("start", defParams, isBanned, handleStart);
  bot.command("set_photo", isAdmin, setPhoto);
  bot.on("message:photo", isAdmin, messagePhoto);
  bot.on("message:text", isBanned, async (ctx, next) => {
    if (ctx.message.text.startsWith("/")) {
      ctx.session.isWaitingForPhoto = false;
    }
    await next();
  });
}
