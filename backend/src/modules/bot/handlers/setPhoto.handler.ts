import { BotContext, PhotoContext } from "../../../infrastructure/telegram/bot.js";
import { setSetting } from "../../../settings.js";
export async function setPhoto(ctx: BotContext) {
  ctx.session.isWaitingForPhoto = true;
  await ctx.reply("📸 Отправьте изображение, которое будет отображаться при запуске /start.");
}
export async function messagePhoto(ctx: PhotoContext) {
  if (!ctx.session.isWaitingForPhoto) return;
  if (!ctx.message.caption)
    return await ctx.reply("❌ Для установки фото укажите ID где будет использоваться. Пример: welcome_photo_id");
  const photo = ctx.message.photo.pop();

  if (photo) {
    await setSetting(ctx.message.caption, photo.file_id);
    ctx.session.isWaitingForPhoto = false;

    await ctx.reply("✅", {
      reply_parameters: { message_id: ctx.message.message_id },
    });
  }
}
