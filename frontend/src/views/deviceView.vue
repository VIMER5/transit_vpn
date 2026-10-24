<script setup lang="ts">
import { isServerError } from "@/app/api/axios";
import SubApi from "@/app/api/sub.api";
import { useSubStore } from "@/app/stores/sub.store";
import type { deviceLimits, deviceList } from "@/app/types/sub.types";
import DeviceInfo from "@/shared/ui/deviceInfo.vue";
import ProgressBar from "@/shared/ui/progress.bar.vue";
import { onMounted, ref } from "vue";

const { getdeviceList, deauthorizeDevice } = SubApi();

const subStore = useSubStore();

const isLoading = ref(true);
const deviceList = ref<deviceList[]>([]);
onMounted(async () => {
  await subStore.updateSubInfo();
  if (subStore.deviceLimit) {
    deviceList.value = await getdeviceList();
  }
});
async function deauthorize(id: number) {
  try {
    if (isLoading.value) return;
    isLoading.value = true;
    await deauthorizeDevice(id);
    await subStore.updateSubInfo();
    if (subStore.deviceLimit) {
      deviceList.value = await getdeviceList();
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <main class="device__view">
    <h2 class="h2">Отметки о въезде</h2>
    <h1 class="h1">Устройства</h1>
    <div class="info" v-if="subStore.sub">
      <div class="device__bar">
        <span
          >Использовано {{ subStore.deviceLimit?.countDivice ?? 0 }} из
          {{ subStore.deviceLimit?.deviceLimitSub ?? 0 }}</span
        >
        <ProgressBar
          class="device__bar-progress"
          :max-value="subStore.deviceLimit?.deviceLimitSub ?? 0"
          :value="subStore.deviceLimit?.countDivice ?? 0"
        />
      </div>
      <ul class="device__list" v-if="deviceList.length > 0">
        <li v-for="device in deviceList" :key="device.id">
          <DeviceInfo :data="device" @click-button-deauthorize="(id) => deauthorize(id)" />
        </li>
      </ul>
      <div class="notDivece" v-else>Вы ещё не подключили своё устройство.</div>
    </div>
    <div class="noSub" v-else>У вас ещё нет транзита</div>
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
.device__list {
  border: 2px solid var(--c-line);
  border-radius: 8px;
}
.device__list li:not(:last-child) {
  border-bottom: 1px solid var(--c-line);
}
.load {
  padding-bottom: 15px;
}
</style>
