<script setup lang="ts">
import navWidget from "@/widgets/nav.widget.vue";
</script>

<template>
  <div class="mainLayour">
    <div class="content"><RouterView /></div>
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
  overflow: scroll;
  margin: 20px 20px 0px 20px;
}
</style>
