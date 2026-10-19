import { db } from "../../infrastructure/database/index.js";
import { subDevice } from "../../infrastructure/database/models/subDevice.model.js";
import { subscriptions } from "../../infrastructure/database/models/subscriptions.model.js";
import { clientType } from "../../shared/types/subscriptions.type.js";
export type GuardResult = "ok" | "no_hwid" | "limit";
class devicesService {
  async deviceGuard(subId: number, deviceInfo: clientType): Promise<GuardResult> {
    if (!deviceInfo || !deviceInfo.hwid || !deviceInfo.isVpnClient) return "no_hwid";
    return db.transaction<GuardResult>(async (t) => {
      const sub = await subscriptions.findByPk(subId, { lock: t.LOCK.UPDATE, transaction: t });
      if (!sub) throw new Error(`Подписка ${subId} не найдена`);
      const device = await subDevice.findOne({
        where: { sub_id: sub.id, hwid_hash: deviceInfo.hwid },
        transaction: t,
      });
      if (device) return "ok";
      const count = await subDevice.count({ where: { sub_id: sub.id }, transaction: t });
      if (count >= sub.device_limit) return "limit";
      await subDevice.create(
        {
          sub_id: sub.id,
          hwid_hash: deviceInfo.hwid,
          agent: deviceInfo.agent,
          deviceName: deviceInfo.deviceName,
          os: deviceInfo.os,
        },
        { transaction: t },
      );
      return "ok";
    });
  }
}

export default new devicesService();
