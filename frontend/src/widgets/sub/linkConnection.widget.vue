<script setup lang="ts">
import { useAppStore } from "@/app/stores/app.store";
import { useNotificationStore } from "@/app/stores/notification.store";
import { useSubStore } from "@/app/stores/sub.store";
import { useTelegram } from "@/composables/useTelegram";
import CopyIcon from "@/shared/icons/copyIcon.vue";
import LinkIcon from "@/shared/icons/LinkIcon.vue";
import UpdateIcon from "@/shared/icons/updateIcon.vue";
import Button from "@/shared/ui/buttons/button.vue";
import UiCard from "@/shared/ui/ui.card.vue";
import { computed, ref } from "vue";

const appStore = useAppStore();
const subStore = useSubStore();
const { openLink } = useTelegram();
const notificationStore = useNotificationStore();
const copied = ref(false);
const isRotateUUID = ref(false);
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
async function RotateUUID() {
  try {
    if (isRotateUUID.value) return;
    isRotateUUID.value = true;
    await subStore.rotateUuidSub();
  } finally {
    isRotateUUID.value = false;
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
      <Button class="btn" @click="openLink(url)" :disabled="isRotateUUID">Подключить</Button>
      <div class="auxiliary__buttons">
        <div class="Заглушка-мб-будет-кнопка"></div>
        <button class="rotateUuidSub-button" @click="RotateUUID" :disabled="isRotateUUID">
          <UpdateIcon :class="{ rotation: isRotateUUID }" color="#e8806f" /> Сбросить ссылку
        </button>
      </div>
    </main>
    <footer class="linkConnectionWidget-footer">
      <div class="perforation"></div>
      <p>Ссылка работает как пароль. Не передавайте её другим людям.</p>
    </footer>
  </UiCard>
</template>

<style scoped>
.auxiliary__buttons {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}
.rotateUuidSub-button {
  color: var(--c-error);
  background-color: transparent;
  display: flex;
  gap: 7px;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
.rotation {
  animation: rotation 1s linear infinite;
}
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
  transition: all 0.5s;
}
.btn:disabled {
  background-color: var(--bg-button);
  color: var(--c-line);
}
.linkConnectionWidget-footer p {
  font-size: 13px;
}
.perforation {
  margin-block: 10px;
}
</style>
