<script setup lang="ts"></script>

<template><span class="loader"></span></template>

<style scoped>
.loader {
  --color-1: #fff;
  --size: 1.05px;
  width: calc(48 * var(--size));
  height: calc(48 * var(--size));
  border: calc(5 * var(--size)) solid var(--color-1);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
</style>
