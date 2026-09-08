<script setup lang="ts">
import logo from "@/shared/icons/logo.vue";

const { errorText = "Что-то пошло не так." } = defineProps<{
  errorText?: string;
}>();
defineEmits(["retry"]);
</script>

<template>
  <div class="error__screen">
    <logo class="loading__logo" state="error" />
    <div class="text">{{ errorText }}</div>
    <button class="buttonReTry" @click="$emit('retry')">Повторить</button>
  </div>
</template>

<style scoped>
.error__screen {
  flex-direction: column;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.text {
  margin-top: 15px;
  margin-bottom: 20px;
  max-width: 70%;
  text-align: center;
}
.buttonReTry {
  max-width: 60%;
  width: 100%;
  padding: 10px 0px;
  border-radius: 14px;
  background-color: var(--bg-button);
  border: 1px solid var(--c-line);
  font-family: "Manrope";
  font-size: 14px;
  font-weight: 500;
}
</style>
