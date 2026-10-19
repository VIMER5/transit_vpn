import cron from "node-cron";
import { Op, literal } from "sequelize";
import { subscriptions } from "../infrastructure/database/models/subscriptions.model.js";
import { User } from "../infrastructure/database/models/user.model.js";
import GlobalFunctionBot from "../modules/bot/global.js";

let expireRunning = false;

async function expireSubscriptions() {
  if (expireRunning) return;
  expireRunning = true;

  try {
    const date = new Date();
    await subscriptions.update({ status: "expired" }, { where: { status: "active", expires_at: { [Op.lte]: date } } });

    const pending = await subscriptions.findAll({
      where: { status: "expired", expiry_handled_at: null },
      limit: 100,
    });
    for (const sub of pending) {
      try {
        await sub.reload();
        if (sub.status !== "expired") continue;
        const user = await User.findOne({ where: { sub_id: sub.id } });
        if (user) {
          await GlobalFunctionBot.notify(user.tg_id.toString(), "🚫 <b>Подписка истекла</b>");
        }
        await sub.update({ expiry_handled_at: date });
      } catch (e) {
        console.error(`Не удалось обработать подписку ${sub.id}:`, e);
      }
    }
  } finally {
    expireRunning = false;
  }
}
async function sendExpiryReminders() {
  const soon = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

  const list = await subscriptions.findAll({
    where: {
      status: "active",
      notified_3d_at: null,
      expires_at: { [Op.between]: [new Date(), soon] },
    },
    limit: 100,
  });

  for (const sub of list) {
    try {
      const user = await User.findOne({ where: { sub_id: sub.id } });
      if (user) {
        await GlobalFunctionBot.notify(user.tg_id.toString(), "⏳ <b>Подписка истекает через ~3 дня</b>");
      }
      await sub.update({ notified_3d_at: new Date() });
    } catch (e) {
      console.error(`Не удалось отправить напоминание по подписке ${sub.id}:`, e);
    }
  }
}

export function startSubscriptionJobs() {
  console.log("SubscriptionJobs в работе");
  cron.schedule("* * * * *", expireSubscriptions);
  cron.schedule("0 * * * *", sendExpiryReminders);
}
