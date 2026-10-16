import { ref, computed } from "vue";
import { defineStore } from "pinia";
import $api from "@/app/api/axios";

// interface

export const useNotificationStore = defineStore("NotificationStore", () => {
  const notification = ref<{ id: string; text: string; textColor: "--c-error" | "--c-done" }[]>([]);

  function setNotification(text: string, textColor: "--c-error" | "--c-done") {
    const id = Math.random().toString(36);
    notification.value.push({ id, text, textColor });
    setTimeout(() => {
      notification.value = notification.value.filter((item) => item.id != id);
    }, 5000);
  }
  return { notification, setNotification };
});
