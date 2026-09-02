<script setup lang="ts">
import axios, { AxiosError } from "axios";
import { ref } from "vue";
const webApp = window.Telegram.WebApp;

console.log(webApp.initDataUnsafe);

const data = ref<{
  data?: any;
  error?: any;
} | null>(null);

async function test() {
  try {
    const data1 = await axios.post("https://www.vape-horizont.ru/api/auth/miniapp", { initData: webApp.initData });
    data.value = data1.data;
  } catch (e) {
    if (e instanceof AxiosError && e.response) {
      data.value = e.response.data;
    }
  }

  // window.Telegram.WebApp.ready();
  // data.value = { ...data1.data };
}

test();
</script>

<template>
  <!-- {{ webApp.initDataUnsafe }}

  kjshgfdkjhsg: {{ webApp.initData }} -->
  <div class="d" v-if="data">
    <div class="unso" v-if="data.data">
      <img :src="data.data.photo_url" alt="" />

      <div class="name">Имя: {{ data.data.first_name }}</div>
      <div class="name">UserName: {{ data.data.username }}</div>
    </div>
    <div class="f" v-else>{{ data }}</div>
  </div>
  <div class="dda" v-else>Загрузка</div>
</template>

<style scoped></style>
