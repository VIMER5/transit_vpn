<script setup lang="ts">
import PlansWidget from "@/widgets/plans/plans.widget.vue";
import type { DataPlans, DataPricing } from "@/app/types/plans.types";
import { onMounted, ref } from "vue";
import $api from "@/app/api/axios";
import PlanBuilderWidget from "@/widgets/plans/planBuilder.widget.vue";

const allPlans = ref<DataPlans[] | null>(null);
const pricing = ref<DataPricing | null>(null);

onMounted(async () => {
  allPlans.value = await getPlans();
  pricing.value = await getPricing();
});

async function getPlans(): Promise<DataPlans[] | null> {
  try {
    const { data } = await $api.get("/plans");
    return data;
  } catch (e) {
    return null;
  }
}
async function getPricing(): Promise<DataPricing | null> {
  try {
    const { data } = await $api.get("/plans/pricing");
    return data;
  } catch (e) {
    return null;
  }
}
</script>

<template>
  <main class="tariffs__view">
    <h1 class="h1">Выбери или создай свою визу!</h1>
    <section class="plans">
      <h2 class="title-with-lines">Готовые тарифы</h2>
      <PlansWidget :data="allPlans" class="mt-10"></PlansWidget>
    </section>
    <section class="planBuilder">
      <h2 class="title-with-lines">Создай свою визу</h2>
      <PlanBuilderWidget :data="pricing" class="mt-10" />
    </section>
  </main>
</template>

<style scoped>
.h1 {
  font-family: "JetBrains Mono";
  font-size: 14px;
  font-weight: 500;
  color: white;
}

.title-with-lines {
  display: flex;
  align-items: center;
  text-align: center;
  gap: 7px;
  width: 100%;
  font-size: 15px;
  font-weight: 500;
}
.plans {
  margin-top: 15px;
}
.title-with-lines::before,
.title-with-lines::after {
  content: "";
  flex: 1;
  border-bottom: 1.5px dashed var(--c-line);
}
.mt-10 {
  margin-top: 10px;
}
.planBuilder {
  margin-top: 18px;
}
</style>
