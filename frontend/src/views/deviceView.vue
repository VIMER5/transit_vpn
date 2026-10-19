<script setup lang="ts">
import SubApi from "@/app/api/sub.api";
import type { deviceLimits, deviceList } from "@/app/types/sub.types";
import ProgressBar from "@/shared/ui/progress.bar.vue";
import { onMounted, ref } from "vue";

const { getDeviceLimit, getdeviceList } = SubApi();
const isLoading = ref(true);
const deviceLimits = ref<deviceLimits | null>();
const deviceList = ref<deviceList[]>([]);
onMounted(async () => {
  try {
    deviceLimits.value = await getDeviceLimit();
    deviceList.value = await getdeviceList();
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <main class="device__view">
    <h2 class="h2">Отметки о въезде</h2>
    <h1 class="h1">Устройства</h1>
    <div class="info" v-if="!isLoading">
      <div class="device__bar">
        <span>Использовано {{ deviceLimits?.countDivice ?? 0 }} из {{ deviceLimits?.deviceLimitSub ?? 0 }}</span>
        <ProgressBar
          class="device__bar-progress"
          :max-value="deviceLimits?.countDivice ?? 0"
          :value="deviceLimits?.deviceLimitSub ?? 0"
        />
      </div>
      <ul class="device__list" v-if="deviceList.length > 0">
        <li v-for="device in deviceList">{{ device }}</li>
      </ul>
      <div class="notDivece" v-else>Вы ещё не подключили своё устройство.</div>
    </div>
    <div class="load" v-else>Загрузка...</div>
  </main>
</template>

<style scoped>
.h2 {
  font-family: "JetBrains Mono";
  font-size: 14px;
  font-weight: 300;
}
.h1 {
  font-family: "JetBrains Mono";
  font-size: 20px;
  font-weight: 500;
  color: white;
  margin-top: 10px;
  margin-bottom: 20px;
}
.device__bar {
  font-family: "JetBrains Mono";
  font-size: 11px;
  margin-bottom: 35px;
}
.device__bar-progress {
  height: 6px !important;
}
.load {
  padding-bottom: 15px;
}
</style>
