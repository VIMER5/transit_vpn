<script setup lang="ts">
import type { DataPricing } from "@/app/types/plans.types";
import { useFormat } from "@/composables/useFormat";
import { useCurrency } from "@/composables/useCurrency";
import Button from "@/shared/ui/buttons/button.vue";
import Range from "@/shared/ui/range.vue";
import UiCard from "@/shared/ui/ui.card.vue";
import { computed, ref } from "vue";
const { formatDevices } = useFormat();
const { kopecksInRUB } = useCurrency();
const props = defineProps<{
  data: DataPricing | null;
}>();

const month = ref<number>(1);
const device = ref<number>(1);
const strDevicePref = computed(() => formatDevices(device.value, true));
const price = computed(() =>
  props.data
    ? month.value * kopecksInRUB(props.data.cost_month_kopecks) +
      device.value * kopecksInRUB(props.data.device_month_rate_kopecks) * month.value
    : 0,
);
</script>

<template>
  <div class="planBuilderWidget">
    <UiCard>
      <div v-if="data" class="content">
        <div class="calc">
          {{ month }} <span>мес.</span> · {{ device }} <span>{{ strDevicePref }}</span> ·
          <span class="accent">{{ price }} ₽</span>
        </div>
        <Range v-model="month" :min="1" :max="data.max_month" prefix="мес." />
        <Range v-model="device" :min="1" :max="data.max_device" prefix="уст." />
        <Button class="buttonOrder">Оформить</Button>
      </div>
      <div class="f" v-else>Загрузка</div>
    </UiCard>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 23px;
}
.content > input {
  width: 100%;
}
.calc {
  color: white;
  font-size: 16px;
  font-weight: 500;
}
.calc > span {
  color: var(--c-main-text);
}
.calc > span.accent {
  color: var(--c-accent);
  font-size: 20px;
  font-weight: 600;
}
.buttonOrder {
  width: 100%;
  font-weight: 500;
  font-size: 14px;
  padding: 16px;
  font-family: "Manrope";
  background-color: var(--c-accent);
  color: var(--c-line);
}
</style>
