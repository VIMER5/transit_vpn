<script setup lang="ts">
import type { DataPlans } from "@/app/types/plans.types";
import PlansCard from "@/shared/ui/plans.card.vue";
import ModalWindow from "@/shared/ui/modalWindow.vue";
import { ref } from "vue";

defineProps<{
  data: DataPlans[] | null;
}>();

const selectedPlan = ref<DataPlans | null>(null);
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
      <div>{{ selectedPlan }}</div>
    </ModalWindow>
  </div>
</template>

<style scoped>
.listPlans {
  display: flex;
  flex-direction: column;
  gap: 11px;
}
</style>
