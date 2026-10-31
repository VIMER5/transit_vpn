<script setup lang="ts">
import BlockWithMoneyWidget from "@/widgets/money/blockWithMoney.widget.vue";
import PaymentHistoryWidget from "@/widgets/money/paymentHistory.widget.vue";
</script>

<template>
  <main class="paymentHistoryView">
    <h2 class="h2">Личный кабинет</h2>
    <h1 class="h1">История платежей</h1>
    <div class="content">
      <BlockWithMoneyWidget />
      <PaymentHistoryWidget />
    </div>
  </main>
</template>

<style scoped>
.paymentHistoryView {
  font-family: "JetBrains Mono";
}
.h2 {
  font-size: 14px;
  font-weight: 300;
}
.h1 {
  font-size: 20px;
  font-weight: 500;
  color: white;
  margin-top: 10px;
  margin-bottom: 20px;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
