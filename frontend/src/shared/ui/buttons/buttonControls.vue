<script setup lang="ts"></script>

<template>
  <button class="ButtonControls"><slot></slot></button>
</template>

<style scoped>
.ButtonControls {
  padding: 12px 15px;
  background-color: var(--buttonControls-bg);
  color: white;
  border-radius: 13px;
  border: 1px solid var(--c-line);
  cursor: pointer;
}
.ButtonControls:disabled {
  color: var(--c-main-text);
}
</style>
