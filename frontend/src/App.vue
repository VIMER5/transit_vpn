<script setup lang="ts">
const webApp = window.Telegram.WebApp;
</script>

<template>
  <!-- {{ webApp.initDataUnsafe }}

  kjshgfdkjhsg: {{ webApp.initData }} -->

  <img :src="webApp.initDataUnsafe.user?.photo_url" alt="" />

  <div class="name">Имя: {{ webApp.initDataUnsafe.user?.first_name }}</div>
  <div class="name">UserName: {{ webApp.initDataUnsafe.user?.username }}</div>
</template>

<style scoped></style>
