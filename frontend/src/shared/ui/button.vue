<script setup lang="ts"></script>

<template>
  <button class="mainButton"><slot></slot></button>
</template>

<style scoped>
.mainButton {
  padding: 14px;
  border-radius: 14px;
  background-color: var(--bg-button);
  border: 1px solid var(--c-line);
  font-family: "JetBrains Mono";
  font-size: 14px;
  font-weight: 400;
  height: max-content;
  line-height: inherit;
  cursor: pointer;
}
.mainButton:hover {
  box-shadow: 0 0 20px var(--c-line);
}
</style>
