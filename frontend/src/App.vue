<script setup lang="ts">
import loadingWidget from "@/widgets/loading.widget.vue";
import { useTelegram } from "@/composables/useTelegram";
import { onMounted } from "vue";
import { useAuthStore } from "@/app/stores/auth.store";
import { initApp } from "./composables/initApp";
import ErrorScreen from "./views/error.screen.vue";
const { ready, expand } = useTelegram();
const { run, status, errorMessage } = initApp();
onMounted(async () => {
  ready();
  expand();
  run();
});
function preventZoom(event: MouseEvent) {
  event.preventDefault();
}
</script>

<template>
  <loadingWidget v-if="status == 'loading'" />
  <ErrorScreen @retry="run" :error-text="errorMessage" v-else-if="status == 'error'" />
  <RouterView @dblclick="preventZoom" v-else />
</template>

<style scoped></style>
