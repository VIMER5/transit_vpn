import { Bot, Context, session, SessionFlavor, Filter } from "grammy";
import { config } from "../../config.js";
interface SessionData {
  isWaitingForPhoto: boolean;
}
export type BotContext = Context & SessionFlavor<SessionData>;
export type PhotoContext = Filter<BotContext, "message:photo">;

const bot = new Bot<BotContext>(config.tg.botToken);

bot.use(
  session({
    initial: (): SessionData => ({ isWaitingForPhoto: false }),
  }),
);

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Ошибка при обработке апдейта ${ctx.update.update_id}:`);
  console.error(err.error);
});
export default bot;
