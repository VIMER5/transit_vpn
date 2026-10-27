<script setup lang="ts">
import { useAppStore } from "@/app/stores/app.store";
import { useSubStore } from "@/app/stores/sub.store";
import { useUserStore } from "@/app/stores/user.store";
import { useCurrency } from "@/composables/useCurrency";
import { usePricing } from "@/composables/usePricing";
import LockIcon from "@/shared/icons/lockIcon.vue";
import ErrorInfoPanel from "@/shared/ui/notification/errorInfoPanel.vue";
import DeviceCountControl from "@/shared/ui/sub/DeviceCountControl.vue";
import UiCard from "@/shared/ui/ui.card.vue";
import { computed, ref } from "vue";

const subStore = useSubStore();
const appStore = useAppStore();
const userStore = useUserStore();
const { calculateSub, calculateDeviceUpdate } = usePricing();
const { kopecksInRUB, formatVolute } = useCurrency();

const numberDevicesSelectedByUsers = ref<number>(subStore.sub?.device_limit ?? 0);

const followingWrite = computed(() => {
  const pricing = appStore.pricing;
  if (!pricing) return 0;
  return calculateSub(pricing, numberDevicesSelectedByUsers.value, 1, 0);
});
const deviceAdd = computed(() => {
  const device_limitInSub = subStore.sub?.device_limit;
  if (!device_limitInSub) return 0;
  return numberDevicesSelectedByUsers.value - device_limitInSub;
});
const total = computed(() => {
  const pricing = appStore.pricing;
  if (!pricing) return 0;
  if (deviceAdd.value <= 0) return 0;
  return calculateDeviceUpdate(pricing, deviceAdd.value, subStore.subLeftDays);
});
const notEnoughFunds = computed(() => Math.max(0, total.value - userStore.balanceInKopecks));
</script>

<template>
  <UiCard class="deviceParametersWidget">
    <div class="isTrials" v-if="subStore.sub?.isTrials"><LockIcon color="#e8806f" /> Недоступно в пробном периоде.</div>
    <header class="deviceParametersWidget-header">
      <h2>Параметры устройств</h2>
      <p>Изменения применятся при оформлении</p>
      <div class="perforation"></div>
    </header>
    <main class="deviceParametersWidget-main">
      <DeviceCountControl
        v-model:device-value="numberDevicesSelectedByUsers"
        :current-device-value="subStore.sub?.device_limit"
        :max-value="appStore.pricing?.max_device ?? 0"
      />
      <div class="summary">
        <div class="summaryLine">
          <span>Спишется сейчас</span>
          <span class="value"> {{ formatVolute(kopecksInRUB(total)) }} ₽</span>
        </div>
        <div class="summaryLine">
          <span>Следующее списание по</span>
          <span class="value"
            >{{ formatVolute(kopecksInRUB(followingWrite)) }} ₽<span style="color: var(--c-main-text)">/мес</span></span
          >
        </div>
        <div class="summaryLine">
          <span>Баланс</span>
          <span class="value" :style="{ color: notEnoughFunds > 0 ? 'var(--c-error)' : 'var(--c-success)' }"
            >{{ userStore.balanceSrt }} ₽
          </span>
        </div>
      </div>
    </main>
    <footer class="subBuilderWiget-footer">
      <ErrorInfoPanel v-if="notEnoughFunds > 0">
        <span style="color: var(--c-error)">Не хватает {{ formatVolute(kopecksInRUB(notEnoughFunds)) }} ₽. </span>
        <RouterLink to="/" style="color: var(--c-accent)">Пополните баланс.</RouterLink>
      </ErrorInfoPanel>
      <button v-else :disabled="deviceAdd == 0" class="btn">
        {{ deviceAdd == 0 ? "Нет изменений" : ` Оформить за ${formatVolute(kopecksInRUB(total))} ₽` }}
      </button>
    </footer>
  </UiCard>
</template>

<style scoped>
.deviceParametersWidget {
  border-radius: 17px;
  overflow: hidden;
  font-family: "Manrope";
  position: relative;
}
.isTrials {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.842);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  color: var(--c-error);
  font-family: "Manrope";
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  gap: 10px;
}
.deviceParametersWidget-header .perforation {
  margin-top: 12px;
}
.deviceParametersWidget-header h2 {
  color: white;
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 8px;
}
.deviceParametersWidget-header p {
  font-size: 13px;
}
.deviceParametersWidget-main {
  padding-block: 10px;
}
.summary {
  margin-top: 25px;
  display: flex;
  gap: 10px;
  flex-direction: column;
}
.summaryLine {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-family: "Manrope";
  font-size: 14px;
}
.summaryLine .value {
  color: white;
  font-weight: 600;
}
.btn {
  width: 100%;
  border: none;
  border-radius: 12px;
  padding: 12px 16px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  font-family: inherit;
  background: var(--c-accent);
  color: #1a1200;
}
.btn:disabled {
  opacity: 0.6;
  cursor: default;
}
</style>
