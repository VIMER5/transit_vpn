import type { InfoCurrentUserSubResponse, deviceLimits, deviceList, fullSubInfo } from "../types/sub.types";
import $api from "@/app/api/axios";
import { purchaseRequestSchema } from "@/app/api/validator/subscriptions.validator";
import { useNotificationStore } from "@/app/stores/notification.store";
import { AxiosError } from "axios";
export default function SubApi() {
  async function getDeviceLimit(): Promise<deviceLimits | null> {
    const notificationStore = useNotificationStore();
    try {
      const { data } = await $api.get<deviceLimits>("/sub/device/limits");
      return data;
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError && e.response && e.response.data.error)
        notificationStore.setNotification(e.response.data.error.message, "--c-error");
      else notificationStore.setNotification("Мой код решил что сегодня выходной", "--c-error");
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
  async function getSubInfoCurrentUser(): Promise<InfoCurrentUserSubResponse | null> {
    const notificationStore = useNotificationStore();
    try {
      const { data } = await $api.get<InfoCurrentUserSubResponse>("/sub");
      return data;
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError && e.response && e.response.data.error)
        notificationStore.setNotification(e.response.data.error.message, "--c-error");
      else notificationStore.setNotification("Мой код решил что сегодня выходной", "--c-error");
      return null;
    }
  }
  async function purchaseSub(Request: any): Promise<fullSubInfo | null> {
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
      const { data } = await $api.post<fullSubInfo>("/sub/purchase", value);
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
  async function getSubTrials(): Promise<InfoCurrentUserSubResponse | null> {
    const notificationStore = useNotificationStore();
    try {
      const { data } = await $api.get<InfoCurrentUserSubResponse>("/sub/trials");
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
  return { getSubInfoCurrentUser, getSubTrials, purchaseSub, getDeviceLimit, getdeviceList };
}
