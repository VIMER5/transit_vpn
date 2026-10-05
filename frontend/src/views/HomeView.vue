<script setup lang="ts">
import BlockWithMoneyWidget from "@/widgets/money/blockWithMoney.widget.vue";
import BlockSubInfoWidget from "@/widgets/users/blockSubInfo.widget.vue";
import MiniReferralPanelWidget from "@/widgets/users/miniReferralPanel.widget.vue";
</script>

<template>
  <main>
    <BlockSubInfoWidget class="subWidget" />
    <BlockWithMoneyWidget />
    <section class="MiniWidget">
      <MiniReferralPanelWidget />
      <MiniReferralPanelWidget />
    </section>
  </main>
</template>

<style scoped>
.subWidget {
  margin-bottom: 20px;
}
.MiniWidget {
  display: grid;
  grid-template-columns: auto auto;
  margin-top: 30px;
  gap: 10px;
}
</style>
