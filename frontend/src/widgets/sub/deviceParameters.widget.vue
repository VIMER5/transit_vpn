<script setup lang="ts">
import SubApi from "@/app/api/sub.api";
import { useAppStore } from "@/app/stores/app.store";
import { useSubStore } from "@/app/stores/sub.store";
import { useUserStore } from "@/app/stores/user.store";
import type { upgradeDeviceQuoteResponse } from "@/app/types/sub.types";
import { useCurrency } from "@/composables/useCurrency";
import { usePricing } from "@/composables/usePricing";
import LockIcon from "@/shared/icons/lockIcon.vue";
import ErrorInfoPanel from "@/shared/ui/notification/errorInfoPanel.vue";
import DeviceCountControl from "@/shared/ui/sub/DeviceCountControl.vue";
import UiCard from "@/shared/ui/ui.card.vue";
import { computed, onBeforeUnmount, ref, watch } from "vue";
import LoaderUI from "@/shared/ui/loaderUI.vue";

const subStore = useSubStore();
const appStore = useAppStore();
const userStore = useUserStore();
const { getDeviceUpgradeQuote, deviceUpgrade } = SubApi();
const { calculateSub } = usePricing();
const { kopecksInRUB, formatVolute } = useCurrency();

const numberDevicesSelectedByUsers = ref<number>(subStore.sub?.device_limit ?? 0);

const followingWrite = computed(() => {
  const pricing = appStore.pricing;
  if (!pricing) return 0;
  return calculateSub(pricing, numberDevicesSelectedByUsers.value, 1, 0);
});

const notEnoughFunds = computed(() => Math.max(0, total.value - userStore.balanceInKopecks));

const quote = ref<upgradeDeviceQuoteResponse | null>(null);
const isQuoting = ref(false);
const quoteError = ref<string | null>(null);
const isQuoteFresh = computed(() => quote.value?.newLimit === numberDevicesSelectedByUsers.value);
const total = computed(() => (isQuoteFresh.value && quote.value ? quote.value.priceKopecks : 0));

const currentLimit = computed(() => subStore.sub?.device_limit ?? 0);
const deviceDiff = computed(() => numberDevicesSelectedByUsers.value - currentLimit.value);

watch(numberDevicesSelectedByUsers, (newCount) => {
  clearTimeout(timer);
  requestId++;
  quote.value = null;
  if (newCount === currentLimit.value) {
    isQuoting.value = false;
    return;
  }
  isQuoting.value = true;
  timer = setTimeout(() => fetchQuote(newCount), 500);
});
let timer: ReturnType<typeof setTimeout> | undefined;
let requestId = 0;
const canSubmit = computed(() => deviceDiff.value !== 0 && isQuoteFresh.value && !isQuoting.value && !quoteError.value);
const buttonLabel = computed(() => {
  if (deviceDiff.value == 0) return "Нет изменений";
  else if (deviceDiff.value < 0) return `Уменьшить до ${numberDevicesSelectedByUsers.value}`;
  else if (isQuoting.value) return "Считаем…";
  return `Оформить за ${formatVolute(kopecksInRUB(total.value))} ₽`;
});
onBeforeUnmount(() => {
  clearTimeout(timer);
  requestId++;
});

async function fetchQuote(deviceCount: number) {
  const id = requestId;
  try {
    const data = await getDeviceUpgradeQuote(deviceCount);
    if (id !== requestId) return;
    quote.value = data;
  } catch (e) {
    if (id !== requestId) return;
    quote.value = null;
    quoteError.value = getErrorMessage(e);
  } finally {
    if (id === requestId) isQuoting.value = false;
  }
}
function getErrorMessage(e: unknown) {
  const msg = (e as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message;
  return typeof msg === "string" ? msg : "Не удалось рассчитать стоимость";
}
const isUpgrade = ref<boolean>(false);
async function submitUpgrade() {
  if (!canSubmit.value || notEnoughFunds.value > 0 || isUpgrade.value || !quote.value) return;
  try {
    isUpgrade.value = true;
    const data = await deviceUpgrade(quote.value.newLimit, quote.value.priceKopecks);
    if (data) {
      await subStore.updateSubInfo();
      await userStore.updateBalance();
    }
  } finally {
    isUpgrade.value = false;
  }
}
</script>

<template>
  <UiCard class="deviceParametersWidget">
    <div
      class="loading"
      style="display: flex; align-items: center; justify-content: center; min-height: 200px"
      v-if="isUpgrade"
    >
      <LoaderUI />
    </div>
    <div class="content" v-else>
      <div class="isTrials" v-if="subStore.sub?.isTrials">
        <LockIcon color="#e8806f" /> Недоступно в пробном периоде.
      </div>
      <header class="deviceParametersWidget-header">
        <h2>Параметры устройств</h2>
        <p>Изменения применятся при оформлении</p>
        <div class="perforation"></div>
      </header>
      <main class="deviceParametersWidget-main">
        <DeviceCountControl
          v-model:device-value="numberDevicesSelectedByUsers"
          :current-device-value="currentLimit"
          :max-value="appStore.pricing?.max_device ?? 0"
        />
        <div class="summary">
          <div class="summaryLine">
            <span>Спишется сейчас</span>
            <span class="value"> {{ isQuoting ? "Считаем…" : formatVolute(kopecksInRUB(total)) }} ₽</span>
          </div>
          <div class="summaryLine">
            <span>Следующее списание по</span>
            <span class="value"
              >{{ formatVolute(kopecksInRUB(followingWrite)) }} ₽<span style="color: var(--c-main-text)"
                >/мес</span
              ></span
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
        <ErrorInfoPanel v-if="quoteError">
          <span style="color: var(--c-error)">{{ quoteError }}</span>
        </ErrorInfoPanel>
        <ErrorInfoPanel v-else-if="notEnoughFunds > 0">
          <span style="color: var(--c-error)">Не хватает {{ formatVolute(kopecksInRUB(notEnoughFunds)) }} ₽. </span>
          <RouterLink to="/" style="color: var(--c-accent)">Пополните баланс.</RouterLink>
        </ErrorInfoPanel>
        <button v-else :disabled="!canSubmit" class="btn" @click="submitUpgrade">
          {{ buttonLabel }}
        </button>
      </footer>
    </div>
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
