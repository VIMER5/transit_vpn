<script setup lang="ts">
import ButtonControls from "../buttons/buttonControls.vue";

const {
  deviceValue = 1,
  maxValue = 100,
  minValue = 1,
  currentDeviceValue = 0,
} = defineProps<{
  deviceValue: number;
  maxValue?: number;
  minValue?: number;
  currentDeviceValue?: number;
}>();

const emit = defineEmits<{
  (e: "update:deviceValue", value: number): void;
}>();

function increment() {
  emit("update:deviceValue", deviceValue + 1 > maxValue ? deviceValue : deviceValue + 1);
}
function decrement() {
  emit("update:deviceValue", Math.max(minValue, deviceValue - 1));
}
</script>

<template>
  <div class="deviceCountControl">
    <div class="content">
      Устройства
      <span v-if="currentDeviceValue">сейчас {{ currentDeviceValue }}</span>
    </div>
    <div class="controls">
      <ButtonControls :disabled="deviceValue <= minValue" @click="decrement" class="button">−</ButtonControls>
      {{ deviceValue }}
      <ButtonControls :disabled="deviceValue >= maxValue" @click="increment" class="button">+</ButtonControls>
    </div>
  </div>
</template>

<style scoped>
.deviceCountControl {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.deviceCountControl .content {
  display: flex;
  font-family: "Manrope";
  color: white;
  font-weight: 600;
  font-size: 15px;
  flex-direction: column;
  gap: 5px;
}
.deviceCountControl .content span {
  color: var(--c-main-text);
  font-weight: 400;
  font-size: 13px;
}
.controls {
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
}
</style>
