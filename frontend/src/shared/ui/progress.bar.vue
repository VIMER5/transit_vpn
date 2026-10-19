<script setup lang="ts">
import { computed } from "vue";

const { value = 10, maxValue = 100 } = defineProps<{
  value?: number;
  maxValue?: number;
}>();

const percentageProgress = computed(() => (value / maxValue) * 100);
</script>

<template>
  <div class="progress__bar" :style="{ '--progress': percentageProgress + '%' }"></div>
</template>

<style scoped>
.progress__bar {
  height: 4px;
  position: relative;
  background: var(--c-line);
  overflow: hidden;
  border-radius: 1000px;
  display: inline-block;
  width: 100%;
}
.progress__bar::after {
  content: "";
  background: var(--c-accent);
  width: var(--progress);
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 1000px;
  box-sizing: border-box;
}
</style>
