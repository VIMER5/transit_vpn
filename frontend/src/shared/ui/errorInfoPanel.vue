<script setup lang="ts"></script>

<template>
  <div class="errorInfo"><slot></slot></div>
</template>

<style scoped>
.errorInfo {
  padding: 10px 12px;
  background: rgba(217, 97, 79, 0.1);
  border: 1px solid rgba(217, 97, 79, 0.3);
  border-radius: 10px;
  font-size: 12.5px;
  line-height: 1.5;
}
</style>
