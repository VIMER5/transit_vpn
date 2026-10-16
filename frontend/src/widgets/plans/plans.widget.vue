<script setup lang="ts">
import type { DataPlans } from "@/app/types/plans.types";
import PlansCard from "@/shared/ui/plans.card.vue";
import ModalWindow from "@/shared/ui/modalWindow.vue";
import { ref, computed } from "vue";
import { useFormat } from "@/composables/useFormat";
import { useUserStore } from "@/app/stores/user.store";
import SubApi from "@/app/api/sub.api";

defineProps<{
  data: DataPlans[] | null;
}>();

const { formatMonths } = useFormat();
const userStore = useUserStore();

const selectedPlan = ref<DataPlans | null>(null);

const isSubmit = ref<boolean>(false);
const hasEnoughBalance = computed(() => {
  if (!selectedPlan.value) return false;
  return userStore.balanceInRUB >= selectedPlan.value.price_kopecks / 100;
});
const missingKopecks = computed(() => {
  if (!selectedPlan.value) return 0;
  return Math.max(0, selectedPlan.value.price_kopecks / 100 - userStore.balanceInRUB);
});
async function SubPurchase() {
  const { purchaseSub } = SubApi();
  try {
    isSubmit.value = true;
    if (!selectedPlan.value) return false;
    await purchaseSub({ planId: selectedPlan.value.id });
  } finally {
    selectedPlan.value = null;
    isSubmit.value = false;
  }
}
</script>

<template>
  <div class="plans__widget">
    <ul class="listPlans">
      <li v-if="data" v-for="plan in data" :key="plan.id">
        <PlansCard :data="plan" @select="selectedPlan = plan" />
      </li>
      <li v-else>Загрузка</li>
    </ul>
    <ModalWindow :open="!!selectedPlan" @update:open="selectedPlan = null">
      <div class="buyModel">
        <div class="buyModel-title">Подтверждение покупки</div>

        <div v-if="!isSubmit" class="plan-fields">
          <div class="field">
            <span class="field-label">Срок</span>
            <span class="field-value">{{ formatMonths(selectedPlan?.duration_months ?? 0) }} </span>
          </div>
          <div class="field">
            <span class="field-label">Устройств</span>
            <span class="field-value">{{ selectedPlan?.device_limit }}</span>
          </div>
        </div>
        <div class="load" v-else><span class="loader"></span></div>

        <div class="perforation" />

        <div class="balance-row">
          <div class="balance-line">
            <span>Стоимость</span>
            <span class="price">{{ (selectedPlan?.price_kopecks ?? 0) / 100 }}₽</span>
          </div>
          <div class="balance-line muted">
            <span>Баланс</span>
            <span>{{ userStore.balanceSrt }} ₽</span>
          </div>

          <p v-if="!hasEnoughBalance" class="insufficient-note">
            Не хватает {{ missingKopecks.toLocaleString("ru-RU") }} ₽ — пополните баланс, чтобы продолжить.
          </p>

          <div class="modal-actions">
            <button @click="selectedPlan = null" class="btn btn-ghost">Отмена</button>
            <button :disabled="isSubmit" @click="SubPurchase" v-if="hasEnoughBalance" class="btn btn-primary">
              Подтвердить
            </button>
          </div>
        </div>
      </div>
    </ModalWindow>
  </div>
</template>

<style scoped>
.loader {
  --color-1: #fff;
  --size: 1.05px;
  width: calc(48 * var(--size));
  height: calc(48 * var(--size));
  border: calc(5 * var(--size)) solid var(--color-1);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.listPlans {
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.buyModel-title {
  font-size: 21px;
  font-weight: 800;
  margin: 0 0 20px;
}

.plan-fields {
  display: flex;
  gap: 28px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field-label {
  font-family: "JetBrains Mono";
}

.field-value {
  font-weight: 700;
  font-size: 15px;
  color: var(--c-accent);
}

.perforation {
  margin: 20px -20px;
  height: 1px;
  background-image: repeating-linear-gradient(90deg, var(--c-line) 0 6px, transparent 6px 12px);
}

.balance-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.balance-line {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.balance-line .price {
  font-weight: 800;
  font-size: 20px;
  color: var(--c-accent);
}

.insufficient-note {
  margin: 14px 0 0;
  padding: 10px 12px;
  background: rgba(217, 97, 79, 0.1);
  border: 1px solid rgba(217, 97, 79, 0.3);
  border-radius: 10px;
  font-size: 12.5px;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  gap: 10px;
}
.btn {
  flex: 1;
  border: none;
  border-radius: 12px;
  padding: 13px 16px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  font-family: inherit;
}
.btn:disabled {
  opacity: 0.6;
  cursor: default;
}
.btn-primary {
  background: var(--c-accent);
  color: #1a1200;
}
.btn-ghost {
  background: transparent;
  border: 1px solid var(--c-line);
  color: var(--c-main-text);
}
</style>
