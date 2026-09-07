<script setup lang="ts">
import loadingWidget from "@/widgets/loading.widget.vue";
import { useTelegram } from "@/shared/lib/telegram/useTelegram";
import { onMounted } from "vue";
import { useAuthStore } from "./app/entities/auth/store/auth.store";
const { ready, expand } = useTelegram();
const authStore = useAuthStore();
onMounted(async () => {
  ready();
  expand();
  await authStore.login();
});
</script>

<template>
  <loadingWidget v-if="!authStore.isRedy" />
  <div class="dd" v-else>dwd</div>
</template>

<style scoped></style>
