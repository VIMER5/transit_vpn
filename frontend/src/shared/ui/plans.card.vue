<script setup lang="ts">
import type { DataPlans } from "@/app/types/plans.types";
import UiCard from "@/shared/ui/ui.card.vue";
import Button from "@/shared/ui/button.vue";
import { useCurrency } from "@/composables/useCurrency";
import { useFormat } from "@/composables/useFormat";
const { kopecksInRUB } = useCurrency();
const { formatDevices, formatMonths } = useFormat();
defineProps<{
  data: DataPlans;
}>();
</script>

<template>
  <div class="plans__card">
    <UiCard :class="{ accent: data.accent }" style="border-radius: 11px">
      <div class="content">
        <header class="plans__card__content-header spaceBetween">
          <div class="term">{{ formatMonths(data.duration_months) }}</div>
          <div class="price">{{ kopecksInRUB(data.price_kopecks) }} ₽</div>
        </header>
        <main class="plans__card__content-main spaceBetween">
          <div class="deviceLimit">{{ formatDevices(data.device_limit) }}</div>
          <div class="monthlyPayment">{{ kopecksInRUB(data.price_kopecks / data.duration_months) }} ₽ / мес</div>
        </main>
        <footer class="plans__card__content-footer">
          <Button class="buttonOrder" :class="{ accentButton: data.accent }">Оформить</Button>
        </footer>
      </div>
    </UiCard>
  </div>
</template>

<style scoped>
.plans__card__content-header {
  color: white;
  font-weight: 600;
  font-size: 16px;
}
.plans__card__content-main {
  font-weight: 600;
  font-size: 13px;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.spaceBetween {
  display: flex;
  justify-content: space-between;
}
.buttonOrder {
  width: 100%;
  font-weight: 500;
  font-size: 14px;
  padding: 16px;
  font-family: "Manrope";
}
.accent {
  border-color: var(--c-accent);
  position: relative;
}
.accent::before {
  content: "ВЫГОДНО";
  position: absolute;
  background-color: var(--c-accent);
  padding: 5px 6px;
  font-weight: 500;
  font-size: 12px;
  border-radius: 15px;
  color: var(--c-line);
  top: -11px;
  right: 15px;
}
.accentButton {
  background-color: var(--c-accent);
  color: var(--c-line);
}
</style>
