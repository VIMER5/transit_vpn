<script setup lang="ts">
import axios, { AxiosError } from "axios";
import { ref } from "vue";
const webApp = window.Telegram.WebApp;

console.log(webApp.initDataUnsafe);

const data = ref<{
  valid: boolean;
  reason: string;
}>({
  valid: false,
  reason: "загрузка",
});

async function test() {
  try {
    const data1 = await axios.post("https://www.vape-horizont.ru/aut", { initData: webApp.initData });
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
  <div class="d" v-if="data.valid">
    <img :src="webApp.initDataUnsafe.user?.photo_url" alt="" />

    <div class="name">Имя: {{ webApp.initDataUnsafe.user?.first_name }}</div>
    <div class="name">UserName: {{ webApp.initDataUnsafe.user?.username }}</div>

    ответ сервера: {{ data.reason }}
  </div>
  <div class="dda" v-else>{{ data.reason }}</div>
</template>

<style scoped></style>
