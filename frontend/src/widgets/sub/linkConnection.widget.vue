<script setup lang="ts">
import { useAppStore } from "@/app/stores/app.store";
import { useNotificationStore } from "@/app/stores/notification.store";
import { useSubStore } from "@/app/stores/sub.store";
import { useTelegram } from "@/composables/useTelegram";
import CopyIcon from "@/shared/icons/copyIcon.vue";
import LinkIcon from "@/shared/icons/LinkIcon.vue";
import Button from "@/shared/ui/buttons/button.vue";
import UiCard from "@/shared/ui/ui.card.vue";
import { computed, ref } from "vue";

const appStore = useAppStore();
const subStore = useSubStore();
const { openLink } = useTelegram();
const notificationStore = useNotificationStore();
const copied = ref(false);
const url = computed(() => `https://${appStore.PayLoad?.subURL}/${subStore.sub?.sub_uuid}`);
async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(url.value);
    notificationStore.setNotification("Ссылка скопирована в буфер обмена", "--c-done");
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (e) {
    console.error("Не удалось скопировать текст: ", e);
    notificationStore.setNotification("Ошибка копирования", "--c-done");
  }
}
</script>

<template>
  <UiCard class="linkConnectionWidget">
    <header class="linkConnectionWidget-header">
      <div class="icon"><LinkIcon /></div>
      <div class="header_content">
        <h2>Ссылка для подключения</h2>
        <p>Добавьте её в Happ или INCY</p>
      </div>
    </header>
    <main class="linkConnectionWidget-main">
      <div class="urlSub">
        <div class="value">{{ url }}</div>
        <button class="copyButton" @click="copyToClipboard" :disabled="copied"><CopyIcon /></button>
      </div>
      <Button class="btn" @click="openLink(url)">Подключить</Button>
    </main>
    <footer class="linkConnectionWidget-footer">
      <div class="perforation"></div>
      <p>Ссылка работает как пароль. Не передавайте её другим людям.</p>
    </footer>
  </UiCard>
</template>

<style scoped>
.linkConnectionWidget {
  border-radius: 17px;
  overflow: hidden;
  font-family: "Manrope";
}
.linkConnectionWidget-header {
  display: flex;
  align-items: center;
  gap: 10px;
}
.icon {
  display: flex;
  padding: 12px;
  background-color: rgb(201, 161, 90, 16%);
  width: max-content;
  height: max-content;
  border-radius: 11px;
  aspect-ratio: 1/1;
  flex-shrink: 0;
  box-sizing: border-box;
}
.header_content h2 {
  color: white;
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 3px;
}
.header_content p {
  font-size: 13px;
}
.urlSub {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
  border-radius: 10px;
  border: 1px solid var(--c-line);
  padding: 10px;
  background-color: var(--bg-main);
  color: var(--c-main-text);
  font-family: "JetBrains Mono";
  font-size: 16px;
}
.urlSub .value {
  white-space: nowrap;
  overflow-y: hidden;
  scrollbar-width: none;
  max-width: 100%;
  -ms-overflow-style: none;
}
.copyButton {
  display: flex;
  padding: 4px;
  background-color: var(--bg-main-panel);
  border: 1px solid var(--c-line);
  border-radius: 6px;
  width: max-content;
  height: max-content;
  flex-shrink: 0;
  box-sizing: border-box;
}
.urlSub .value::-webkit-scrollbar {
  /* Для Chrome, Safari, Edge */
  display: none;
  width: 0;
  height: 0;
}
.btn {
  margin-top: 10px;
  background-color: var(--c-accent);
  color: black;
  font-family: "Manrope";
  font-weight: 500;
  border-radius: 10px;
  width: 100%;
}
.linkConnectionWidget-footer p {
  font-size: 13px;
}
.perforation {
  margin-block: 10px;
}
</style>
