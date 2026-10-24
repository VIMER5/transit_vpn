<script setup lang="ts"></script>

<template>
  <div class="warnInfo">
    <div class="icon"><slot name="icon"></slot></div>
    <div class="content">
      <h3 class="title">Важно</h3>
      <p class="text"><slot name="text"></slot></p>
    </div>
  </div>
</template>

<style scoped>
.warnInfo {
  padding: 15px;
  background-color: rgb(201, 161, 90, 9%);
  border: 1px dashed rgb(201, 161, 90, 55%);
  border-radius: 17px;
  display: flex;
  gap: 10px;
}
.icon {
  display: flex;
  padding: 12px;
  background-color: rgb(201, 161, 90, 16%);
  width: max-content;
  height: max-content;
  border-radius: 15px;
  aspect-ratio: 1/1;
  flex-shrink: 0;
  box-sizing: border-box;
}
.content {
  font-size: 14px;
  font-family: "JetBrains Mono";
}
.title {
  color: var(--c-accent);
  font-weight: 600;
  margin-bottom: 5px;
}
.text {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-family: "Manrope";
}
</style>
