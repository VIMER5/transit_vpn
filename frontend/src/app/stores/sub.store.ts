import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { subInfo } from "../types/sub.types";
import SubApi from "../api/sub.api";
import { useNotificationStore } from "./notification.store";
import { AxiosError } from "axios";

const { getSubInfoCurrentUser } = SubApi();

export const useSubStore = defineStore("SubStore", () => {
  const notificationStore = useNotificationStore();

  const sub = ref<subInfo | null>(null);
  const subLoading = ref(false);

  const subIsActive = computed(() => sub.value?.status === "active");
  const strStatusSub = computed(() => (subIsActive.value ? "Транзит активен" : "Транзит неактивен"));
  const subExpires_at = computed(() => (sub.value ? new Date(sub.value.expires_at) : null));
  const subValidUntil = computed(() => subExpires_at.value?.toLocaleDateString("ru-RU") ?? "-");
  const subLeftDays = computed(() => {
    if (!subExpires_at.value) return 0;
    const diffMs = subExpires_at.value.getTime() - Date.now();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays < 0 ? 0 : diffDays;
  });
  async function fetchSub() {
    if (subLoading.value) return;
    subLoading.value = true;
    try {
      sub.value = await getSubInfoCurrentUser();
    } finally {
      subLoading.value = false;
    }
  }
  async function updateSubInfo() {
    try {
      await fetchSub();
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError && e.response && e.response.data.error)
        notificationStore.setNotification(e.response.data.error.message, "--c-error");
      else notificationStore.setNotification("Мой код решил что сегодня выходной", "--c-error");
    }
  }
  async function initSubStore() {
    try {
      await fetchSub();
    } catch (e) {
      throw new Error("Ошибка инициализации AppStore", {
        cause: e,
      });
    }
  }
  return {
    sub,
    subIsActive,
    strStatusSub,
    subExpires_at,
    subValidUntil,
    subLeftDays,
    initSubStore,
    fetchSub,
    updateSubInfo,
  };
});
