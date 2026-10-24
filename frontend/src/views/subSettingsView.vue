<script setup lang="ts">
import { useSubStore } from "@/app/stores/sub.store";
import BlockSubInfoWidget from "@/widgets/sub/blockSubInfo.widget.vue";
import LinkConnectionWidget from "@/widgets/sub/linkConnection.widget.vue";
import { onMounted } from "vue";

const subStore = useSubStore();

onMounted(async () => {
  await subStore.updateSubInfo();
});
</script>

<template>
  <main class="subSettingsView">
    <h2 class="h2">Личный кабинет</h2>
    <h1 class="h1">Моя подписка</h1>
    <div class="content">
      <BlockSubInfoWidget :is-setting="true" :data-update-mounted="false" />
      <LinkConnectionWidget />
    </div>
  </main>
</template>

<style scoped>
.subSettingsView {
  font-family: "JetBrains Mono";
}
.h2 {
  font-size: 14px;
  font-weight: 300;
}
.h1 {
  font-size: 20px;
  font-weight: 500;
  color: white;
  margin-top: 10px;
  margin-bottom: 20px;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
