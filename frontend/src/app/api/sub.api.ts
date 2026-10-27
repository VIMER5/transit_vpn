import type { deviceLimits, deviceList, rotateUuidSubResponse, subInfo } from "../types/sub.types";
import $api from "@/app/api/axios";
import { purchaseRequestSchema } from "@/app/api/validator/subscriptions.validator";
import { useNotificationStore } from "@/app/stores/notification.store";
import { AxiosError } from "axios";
import type { serverError } from "../types/global.types";
export default function SubApi() {
  async function deauthorizeDevice(deviceId: number) {
    const notificationStore = useNotificationStore();
    try {
      const { data } = await $api.delete<boolean>("/sub/device/deauthorize", {
        data: {
          deviceId: deviceId,
        },
      });
      if (data) notificationStore.setNotification("Успешно", "--c-done");
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError && e.response && e.response.data.error) {
        notificationStore.setNotification(e.response.data.error.message, "--c-error");
      } else notificationStore.setNotification("Мой код решил что сегодня выходной", "--c-error");
    }
  }
  async function getDeviceLimit(): Promise<deviceLimits | null> {
    try {
      const { data } = await $api.get<deviceLimits>("/sub/device/limits");
      return data;
    } catch (e) {
      return null;
    }
  }
  async function getdeviceList(): Promise<deviceList[]> {
    const notificationStore = useNotificationStore();
    try {
      const { data } = await $api.get<deviceList[]>("/sub/device/");
      return data;
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError && e.response && e.response.data.error)
        notificationStore.setNotification(e.response.data.error.message, "--c-error");
      else notificationStore.setNotification("Мой код решил что сегодня выходной", "--c-error");
      return [];
    }
  }
  async function rotateUserUuidSub() {
    const { data } = await $api.patch<rotateUuidSubResponse>("/sub/rotateSubUuid");
    return data;
  }
  async function getSubInfoCurrentUser(): Promise<subInfo | null> {
    const { data } = await $api.get<subInfo>("/sub");
    return data;
  }
  async function purchaseSub(Request: any): Promise<subInfo | null> {
    const notificationStore = useNotificationStore();
    try {
      const { error, value } = purchaseRequestSchema.validate(Request, {
        abortEarly: true,
        stripUnknown: true,
      });
      if (error) {
        notificationStore.setNotification("Ошибка данных", "--c-error");
        throw new Error("validation_failed");
      }
      const { data } = await $api.post<subInfo>("/sub/purchase", value);
      notificationStore.setNotification("Успешно", "--c-done");
      return data;
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError && e.response && e.response.data.error)
        notificationStore.setNotification(e.response.data.error.message, "--c-error");
      else notificationStore.setNotification("Мой код решил что сегодня выходной", "--c-error");
      return null;
    }
  }
  async function getSubTrials(): Promise<subInfo | null> {
    const notificationStore = useNotificationStore();
    try {
      const { data } = await $api.get<subInfo>("/sub/trials");
      notificationStore.setNotification("Успешно", "--c-done");
      return data;
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError && e.response && e.response.data.error)
        notificationStore.setNotification(e.response.data.error.message, "--c-error");
      else notificationStore.setNotification("Мой код решил что сегодня выходной", "--c-error");
      return null;
    }
  }
  return {
    getSubInfoCurrentUser,
    getSubTrials,
    purchaseSub,
    getDeviceLimit,
    getdeviceList,
    deauthorizeDevice,
    rotateUserUuidSub,
  };
}
