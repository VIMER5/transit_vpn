<script setup lang="ts">
import BlockWithMoneyWidget from "@/widgets/money/blockWithMoney.widget.vue";
import BlockSubInfoWidget from "@/widgets/users/blockSubInfo.widget.vue";
</script>

<template>
  <main>
    <BlockSubInfoWidget class="subWidget" />
    <BlockWithMoneyWidget />
  </main>
</template>

<style scoped>
.subWidget {
  margin-bottom: 20px;
}
</style>
