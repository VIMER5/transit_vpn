import { InlineKeyboard } from "grammy";
import bot, { BotContext } from "../../infrastructure/telegram/bot.js";
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
  async notify(chat_id: string, text: string) {
    await bot.api
      .sendMessage(chat_id, text, {
        parse_mode: "HTML",
      })
      .catch((err) => console.error(`Не удалось отправить уведомление в чат ТГ ${chat_id}:`, err));
  }
}

export default new GlobalFunctionBot();
