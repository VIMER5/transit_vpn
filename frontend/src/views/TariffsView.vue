<script setup lang="ts">
import PlansWidget from "@/widgets/plans/plans.widget.vue";
import type { DataPlans, DataPricing } from "@/app/types/plans.types";
import { onMounted, ref } from "vue";
import $api from "@/app/api/axios";
import PlanBuilderWidget from "@/widgets/plans/planBuilder.widget.vue";
import ModalWindow from "@/shared/ui/modalWindow.vue";

const allPlans = ref<DataPlans[] | null>(null);
const pricing = ref<DataPricing | null>(null);
const isOpenModal = ref(true);

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
    <ModalWindow v-model:open="isOpenModal">
      <div class="tariffs__warn">
        <h3>Внимание</h3>

        <p>При покупке новой подписки текущая подписка будет аннулирована.</p>
        <ul>
          <li><span>Готовая подписка</span> — параметры фиксированы и не могут быть изменены после покупки.</li>
          <li>
            <span>Кастомная подписка</span> — параметры настраиваются вами. В дальнейшем их можно изменить без
            перевыпуска подписки
          </li>
        </ul>
      </div>
    </ModalWindow>
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

.tariffs__warn > h3 {
  margin-bottom: 20px;
  color: var(--c-accent);
  font-size: 20px;
}
.tariffs__warn {
  font-size: 16px;
}
.tariffs__warn > p {
  font-size: 15px;
  text-align: start;
  margin-bottom: 15px;
}
.tariffs__warn > ul {
  text-align: start;
}
.tariffs__warn > ul li {
  margin-bottom: 10px;
}
.tariffs__warn > ul > li > span {
  color: var(--c-accent);
}
</style>
