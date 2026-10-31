<script setup lang="ts">
import { paymentAPI } from "@/app/api/payment.api";
import type { paymentInfo } from "@/app/types/payment.types";
import Button from "@/shared/ui/buttons/button.vue";
import PaymentInfoUI from "@/shared/ui/payment/paymentInfoUI.vue";
import { computed, onMounted, ref } from "vue";

const { getUserPaymentHistory } = paymentAPI();

const paymentHistory = ref<paymentInfo[]>([]);
const offset = computed(() => paymentHistory.value.length);
const limit = 10;
const buttonMore = ref<boolean>(true);
const isLoading = ref<boolean>(false);
onMounted(async () => {
  await downloadMore();
});

async function downloadMore() {
  if (!buttonMore || isLoading.value) return;
  try {
    isLoading.value = true;
    const data = await getUserPaymentHistory(offset.value, limit);
    if (!data || data.length < limit) buttonMore.value = false;
    if (data) paymentHistory.value = paymentHistory.value.concat(data);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="paymentHistoryWidget">
    <div class="paymentHistory" v-if="paymentHistory.length > 0">
      <ul class="paymentHistoryWidget__list">
        <li v-for="payment in paymentHistory">
          <PaymentInfoUI :payment-info="payment" />
        </li>
      </ul>
      <Button @click="downloadMore" :disabled="isLoading" v-if="buttonMore" class="btn">{{
        !isLoading ? "Показать ещё" : "Загрузка..."
      }}</Button>
    </div>
    <div class="paymentHistoryNone" style="text-align: center" v-else>У вас нет платежей</div>
  </div>
</template>

<style scoped>
.paymentHistoryWidget__list {
  border: 2px solid var(--c-line);
  border-radius: 8px;
}
.paymentHistoryWidget__list li:not(:last-child) {
  border-bottom: 2px solid var(--c-line);
}
.btn {
  margin-top: 14px;
  width: 100%;
}
.btn:disabled {
  color: var(--c-main-text);
}
</style>
