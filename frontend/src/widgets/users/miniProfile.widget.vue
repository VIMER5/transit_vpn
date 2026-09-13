<script setup lang="ts">
defineProps<{
  photo_url: string;
  username: string;
  firstAndLastName: string;
}>();
</script>

<template>
  <div class="miniProfile">
    <img class="miniProfile-img" :src="photo_url" alt="IMG" />
    <div class="content-text">
      <h2>{{ firstAndLastName }}</h2>
      <h3>{{ username }}</h3>
    </div>
  </div>
</template>

<style scoped>
.miniProfile {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 1px;
  gap: 10px;
}
.miniProfile-img {
  height: 100%;
  width: auto;
  border-radius: 20px;
  border: 1px solid var(--c-line);
}
.content-text {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
}
.content-text > h2 {
  color: white;
  font-size: 16px;
}
.content-text > h3 {
  font-size: 14px;
}
</style>
