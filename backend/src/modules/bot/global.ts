import { InlineKeyboard } from "grammy";
import { BotContext } from "../../infrastructure/telegram/bot.js";
import { getSetting } from "../../settings.js";

interface dataSender {
  content: string;
  namePhoto: string;
}

class GlobalFunctionBot {
  async SendWithPhoto(ctx: BotContext, data: dataSender, keyboard: InlineKeyboard | undefined = undefined) {
    const photoFileId = await getSetting(data.namePhoto);
    if (photoFileId) {
      await ctx.replyWithPhoto(photoFileId, {
        caption: data.content,
        parse_mode: "HTML",
        reply_markup: keyboard,
      });
    } else
      await ctx.reply(data.content, {
        parse_mode: "HTML",
        reply_markup: keyboard,
      });
  }
}

export default new GlobalFunctionBot();
