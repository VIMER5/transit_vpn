<script setup lang="ts">
import logo from "@/shared/icons/logo.vue";
import loadersProgressLine from "@/shared/ui/loaders.progress.line.vue";
import { ref, onMounted, onUnmounted } from "vue";

const {
  phrases = ["Проверяем документы...", "Сверяем данные с сервером...", "Оформляем пропуск...", "Почти готово..."],
} = defineProps<{
  phrases?: string[];
}>();
let intervalId: number | null = null;
const currentPhraseIndex = ref<number>(0);
onMounted(() => {
  intervalId = setInterval(() => {
    currentPhraseIndex.value = Math.floor(Math.random() * phrases.length);
  }, 3000);
});
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <div class="loading">
    <logo class="loading__logo" />
    <div class="text">{{ phrases[currentPhraseIndex] }}</div>
    <loadersProgressLine class="loadersLine" />
  </div>
</template>

<style scoped>
.loading {
  flex-direction: column;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.loadersLine {
  width: 70%;
}
.text {
  margin-top: 15px;
  margin-bottom: 20px;
}
</style>
<style>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loading__logo > .circleDots {
  transform-box: fill-box;
  transform-origin: center;
  animation: spin 4s linear infinite;
}
</style>
