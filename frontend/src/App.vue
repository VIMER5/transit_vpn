<script setup lang="ts">
import loadingWidget from "@/widgets/loading.widget.vue";
import { useTelegram } from "@/composables/useTelegram";
import { onMounted } from "vue";
import { initApp } from "@/composables/initApp";
import ErrorScreen from "@/views/error.screen.vue";
import { useUserStore } from "@/app/stores/user.store";
import BannedView from "@/views/bannedView.vue";
const { ready, expand } = useTelegram();
const { run, status, errorMessage } = initApp();
const userStore = useUserStore();
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
  <loadingWidget v-if="status == 'loading' && !userStore.isUserBanned" />
  <ErrorScreen @retry="run" :error-text="errorMessage" v-else-if="status == 'error' && !userStore.isUserBanned" />
  <RouterView @dblclick="preventZoom" v-else-if="status == 'ready' && !userStore.isUserBanned" />
  <BannedView v-else />
</template>

<style scoped></style>
