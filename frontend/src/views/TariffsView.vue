<script setup lang="ts">
import { onMounted, ref } from "vue";
import ModalWindow from "@/shared/ui/modalWindow.vue";
import { useAppStore } from "@/app/stores/app.store";
import SubBuilderWiget from "@/widgets/sub/subBuilder.wiget.vue";
import WarnInfoPanel from "@/shared/ui/notification/warnInfoPanel.vue";
import DestroySubIcon from "@/shared/icons/destroySubIcon.vue";
import { useSubStore } from "@/app/stores/sub.store";

const appStore = useAppStore();
const subStore = useSubStore();

onMounted(async () => {
  await appStore.fetchPricing();
});
</script>

<template>
  <main class="tariffs__view">
    <h1 class="h1">Создай свою визу!</h1>
    <WarnInfoPanel style="margin-bottom: 10px" v-if="subStore.subIsActive">
      <template v-slot:icon><DestroySubIcon /></template>
      <template v-slot:text>У вас уже есть активный транзит. При покупке нового текущий будет аннулирован.</template>
    </WarnInfoPanel>
    <SubBuilderWiget :pricing="appStore.pricing" />
  </main>
</template>

<style scoped>
.h1 {
  font-family: "JetBrains Mono";
  font-size: 14px;
  font-weight: 500;
  color: white;
  margin-bottom: 20px;
}
</style>
