<script setup lang="ts">
import UiCard from "@/shared/ui/ui.card.vue";
</script>

<template>
  <UiCard class="icon__panel">
    <div class="svg"><slot></slot></div>
  </UiCard>
</template>

<style scoped>
.icon__panel {
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 0;
}
.svg {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 0;
}
</style>
