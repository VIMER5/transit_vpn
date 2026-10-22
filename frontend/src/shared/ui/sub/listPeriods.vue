<script setup lang="ts">
import type { SubPeriod } from "@/app/types/plans.types";
import ButtonControls from "../buttons/buttonControls.vue";

defineProps<{
  list: SubPeriod[];
  selectPeriod: SubPeriod | null;
}>();

defineEmits<{
  (e: "update:selectPeriod", value: SubPeriod): void;
}>();
</script>

<template>
  <ul class="listPeriods">
    <li v-for="item in list" :key="item.id">
      <ButtonControls
        class="listPeriods-button"
        :class="{ select: selectPeriod && selectPeriod.id == item.id }"
        @click="$emit('update:selectPeriod', item)"
      >
        <div class="value">{{ item.months }} мес</div>
        <div v-if="item.discount_percent !== 0" class="percent">{{ item.discount_percent }}%</div>
      </ButtonControls>
    </li>
  </ul>
</template>

<style scoped>
.listPeriods {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.listPeriods li {
  display: flex;
}
.listPeriods-button {
  display: flex;
  flex: 1;
  flex-direction: column;
  color: var(--c-main-text);
  font-weight: 600;
  font-size: 13px;
  gap: 3px;
}
.listPeriods-button .percent {
  color: var(--c-success);
  font-size: 11px;
}
.listPeriods-button.select {
  border-color: var(--c-accent);
  background-color: rgb(201, 161, 90, 14%);
  color: white;
}
</style>
