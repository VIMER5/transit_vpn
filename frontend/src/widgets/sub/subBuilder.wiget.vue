<script setup lang="ts">
import SubApi from "@/app/api/sub.api";
import { useSubStore } from "@/app/stores/sub.store";
import { useUserStore } from "@/app/stores/user.store";
import type { DataPricing, SubPeriod } from "@/app/types/plans.types";
import { useCurrency } from "@/composables/useCurrency";
import { usePricing } from "@/composables/usePricing";
import ErrorInfoPanel from "@/shared/ui/notification/errorInfoPanel.vue";
import LoaderUI from "@/shared/ui/loaderUI.vue";
import DeviceCountControl from "@/shared/ui/sub/DeviceCountControl.vue";
import ListPeriods from "@/shared/ui/sub/listPeriods.vue";
import UiCard from "@/shared/ui/ui.card.vue";
import { computed, ref } from "vue";

const props = defineProps<{
  pricing: DataPricing | null;
}>();
const isSubmit = ref<boolean>(false);
const userStore = useUserStore();
const subStore = useSubStore();
const { calculateSub } = usePricing();
const { purchaseSub } = SubApi();
const { kopecksInRUB, formatVolute } = useCurrency();
const readyPricing = computed(() => {
  const pricing = props.pricing;
  if (!pricing || pricing.SubPeriod.length === 0) {
    return null;
  }
  return pricing;
});
const deviceCountSelect = ref<number>(1);
const selectPeriod = ref<SubPeriod | null>(readyPricing.value?.SubPeriod[0] ?? null);

const total = computed(() => {
  const pricing = readyPricing.value;
  const Period = selectPeriod.value;
  if (!pricing || !Period) return 0;
  return calculateSub(pricing, deviceCountSelect.value, Period.months, Period.discount_percent);
});
const notEnoughFunds = computed(() => Math.max(0, total.value - userStore.balanceInKopecks));

async function SubPurchase() {
  if (isSubmit.value) return;
  isSubmit.value = true;
  try {
    await purchaseSub({
      custom: {
        deviceCount: deviceCountSelect.value,
        periodId: selectPeriod.value?.id,
      },
    });
    await subStore.updateSubInfo();
    await userStore.updateBalance();
  } finally {
    isSubmit.value = false;
  }
}
</script>

<template>
  <div class="subBuilderWiget">
    <UiCard class="UiCard">
      <div v-if="readyPricing" class="Builder">
        <div v-if="!isSubmit" class="content">
          <DeviceCountControl v-model:device-value="deviceCountSelect" :max-value="readyPricing.max_device" />
          <div class="perforation"></div>
          <div class="period">
            <h2 class="period-h2">Период</h2>
            <ListPeriods v-model:select-period="selectPeriod" :list="readyPricing.SubPeriod" />
          </div>
          <div class="summary">
            <div class="summaryLine">
              <span>Спишется сейчас</span>
              <span class="value">{{ formatVolute(kopecksInRUB(total)) }} ₽</span>
            </div>
            <div class="summaryLine">
              <span>Баланс</span>
              <span class="value" :style="{ color: notEnoughFunds > 0 ? 'var(--c-error)' : 'var(--c-success)' }">
                {{ userStore.balanceSrt }} ₽
              </span>
            </div>
          </div>
          <header class="subBuilderWiget-header">
            <ErrorInfoPanel v-if="notEnoughFunds > 0">
              <span style="color: var(--c-error)">Не хватает {{ formatVolute(kopecksInRUB(notEnoughFunds)) }} ₽. </span>
              <RouterLink to="/" style="color: var(--c-accent)">Пополните баланс.</RouterLink>
            </ErrorInfoPanel>
            <button v-else :disabled="isSubmit" @click="SubPurchase" class="btn btn-primary">
              Оформить за {{ formatVolute(kopecksInRUB(total)) }} ₽
            </button>
          </header>
        </div>
        <div class="load" v-else><LoaderUI /></div>
      </div>
      <div v-else class="notData">Нет данных</div>
    </UiCard>
  </div>
</template>

<style scoped>
.perforation {
  margin-block: 10px;
}
.UiCard {
  padding: 20px 15px;
  border-radius: 17px;
  overflow: hidden;
}
.period-h2 {
  color: white;
  font-family: "Manrope";
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
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
.subBuilderWiget-header {
  margin-top: 20px;
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
.load {
  display: flex;
  justify-content: center;
}
</style>
