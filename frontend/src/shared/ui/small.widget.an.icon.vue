<script setup lang="ts">
import IconPanel from "@/shared/ui/icon.panel.vue";
import UiCard from "@/shared/ui/ui.card.vue";
</script>

<template>
  <UiCard class="smallWidget">
    <div class="content">
      <IconPanel class="icon"><slot name="icon"></slot></IconPanel>
      <main class="main"><slot name="main"></slot></main>
      <div class="r">
        <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.499999 12.5L6.5 6.5L0.5 0.5" stroke="#2A3548" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>
  </UiCard>
</template>

<style scoped>
.smallWidget {
  padding: 12px 8px;
  width: 100%;
  box-sizing: border-box;
}
.content {
  display: grid;
  grid-template-columns: 30% 1fr max-content;
  column-gap: 10px;
}
.icon {
  aspect-ratio: 1/1;
}
.main {
  align-content: end;
  padding: 5px 0px;
  min-width: 0;
  overflow: hidden;
}
.r {
  align-content: center;
  padding-right: 5px;
}
</style>
