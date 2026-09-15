<script setup lang="ts">
import { ref, computed, watch } from "vue";

const props = defineProps<{
  min: number;
  max: number;
  prefix: string;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();
const val = ref(props.min);
watch(
  val,
  (newValue) => {
    emit("update:modelValue", newValue);
  },
  { immediate: true },
);
const thumbWidth = 17;
const badgeStyle = computed(() => {
  const percent = ((val.value - props.min) / (props.max - props.min)) * 100;
  const offset = thumbWidth / 2 - percent * (thumbWidth / 100);
  return { left: `calc(${percent}% + ${offset}px)` };
});
</script>

<template>
  <div class="range-container">
    <div class="range-wrapper">
      <input type="range" v-model.number="val" :min="min" :max="max" />
      <output class="range-value" :style="badgeStyle">{{ val }} {{ prefix }}</output>
    </div>
    <div class="range-labels">
      <span>
        <div class="value" v-if="val != min">{{ min }}</div>
      </span>
      <span v-if="val != max">{{ max }}</span>
    </div>
  </div>
</template>

<style scoped>
.range-container {
  width: 100%;
  position: relative;
}

.range-wrapper {
  position: relative;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 1px;
  background: var(--c-line);
  outline: none;
  margin: 0;
  cursor: pointer;
}

/* для Webkit (Chrome, Safari, Edge) */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 17px;
  height: 17px;
  border-radius: 100%;
  background: var(--c-accent);
  cursor: pointer;
}

/* для Firefox */
input[type="range"]::-moz-range-thumb {
  width: 17px;
  height: 17px;
  border-radius: 100%;
  background: var(--c-accent);
  border: none;
  cursor: pointer;
}
.range-value {
  position: absolute;
  top: 24px;
  transform: translateX(-50%);
  width: max-content;
  color: var(--c-main-text);
}
.range-labels {
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  color: var(--c-line);
  font-size: 13px;
}
</style>
