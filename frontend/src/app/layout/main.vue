<script setup lang="ts">
import navWidget from "@/widgets/nav.widget.vue";
</script>

<template>
  <div class="mainLayour">
    <div class="content">
      <RouterView />
      <header class="header">Transit VPN</header>
    </div>
    <navWidget />
  </div>
</template>

<style scoped>
.mainLayour {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  overflow: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE и Edge */
  margin: 20px 20px 0px 20px;
}
.content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
.header {
  text-align: center;
  margin-top: 10px;
  font-size: 8px;
}
</style>
