import { db } from "../../infrastructure/database/index.js";
import { subDevice } from "../../infrastructure/database/models/subDevice.model.js";
import { subscriptions } from "../../infrastructure/database/models/subscriptions.model.js";
import { User } from "../../infrastructure/database/models/user.model.js";
import SubError from "../../shared/errors/sub.error.js";
import userError from "../../shared/errors/user.error.js";
import { clientType } from "../../shared/types/subscriptions.type.js";
export type GuardResult = "ok" | "no_hwid" | "limit";
class devicesService {
  async countDeviceInSub(sub_id: number) {
    return await subDevice.count({ where: { sub_id } });
  }
  async getDeviceLimitsByUserID(userId: bigint): Promise<{
    deviceLimitSub: number;
    countDivice: number;
  }> {
    const subUser = await User.findByPk(userId, {
      include: [
        {
          model: subscriptions,
          as: "Sub",
          attributes: ["id", "device_limit"],
          include: [{ model: subDevice, as: "devices" }],
        },
      ],
      attributes: ["id"],
    });
    if (!subUser) throw userError.userNotFound();
    if (!subUser.Sub) throw SubError.subNotFound();
    const countDivice = subUser.Sub.devices ? subUser.Sub.devices.length : 0;
    return { deviceLimitSub: subUser.Sub.device_limit, countDivice };
  }
  async getDevicesByUserID(userId: bigint): Promise<subDevice[]> {
    const subUser = await User.findByPk(userId, {
      include: [
        {
          model: subscriptions,
          as: "Sub",
          attributes: ["id"],
          include: [{ model: subDevice, as: "devices", attributes: { exclude: ["updatedAt", "sub_id", "hwid_hash"] } }],
        },
      ],
      attributes: ["id"],
    });
    if (!subUser) throw userError.userNotFound();
    if (!subUser.Sub) throw SubError.subNotFound();
    if (!subUser.Sub.devices) return [];
    return subUser.Sub.devices;
  }
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
