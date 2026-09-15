<script setup lang="ts">
import type { DataPlans } from "@/app/types/plans.types";
import PlansCard from "@/shared/ui/plans.card.vue";

defineProps<{
  data: DataPlans[] | null;
}>();
</script>

<template>
  <div class="plans__widget">
    <ul class="listPlans">
      <li v-if="data" v-for="value in data">
        <PlansCard :data="value" />
      </li>
      <li v-else>Загрузка</li>
    </ul>
  </div>
</template>

<style scoped>
.listPlans {
  display: flex;
  flex-direction: column;
  gap: 11px;
}
</style>
