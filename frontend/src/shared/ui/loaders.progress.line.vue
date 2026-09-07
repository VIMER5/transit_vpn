<script setup lang="ts"></script>

<template>
  <div class="loaders__progress__line"></div>
</template>

<style scoped>
.loaders__progress__line {
  height: 4px;
  position: relative;
  background: var(--c-line);
  overflow: hidden;
  border-radius: 1000px;
  display: inline-block;
}
.loaders__progress__line::after {
  content: "";
  background: var(--c-accent);
  width: 40%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  animation: animloader 2s linear infinite;
  border-radius: 1000px;
  box-sizing: border-box;
}
@keyframes animloader {
  0% {
    left: 0;
    transform: translateX(-100%);
  }
  100% {
    left: 100%;
    transform: translateX(0%);
  }
}
</style>
