<script setup lang="ts">
import type { paymentInfo, TypesBalanceTransaction } from "@/app/types/payment.types";
import { useCurrency } from "@/composables/useCurrency";
import IconPanel from "../icon.panel.vue";
import ReferralBonusIcon from "@/shared/icons/payment/referralBonusIcon.vue";
import TopupIcon from "@/shared/icons/payment/topupIcon.vue";
import PurchaseIcon from "@/shared/icons/payment/purchaseIcon.vue";
import SubUpdateIcon from "@/shared/icons/payment/subUpdateIcon.vue";
import RefundIcon from "@/shared/icons/payment/refundIcon.vue";
import { computed } from "vue";

const { formatVolute, kopecksInRUB } = useCurrency();

const props = defineProps<{
  paymentInfo: paymentInfo;
}>();

const datePayment = computed(() => new Date(props.paymentInfo.createdAt).toLocaleDateString("ru-RU"));

const typePayment = computed(() => {
  switch (props.paymentInfo.type) {
    case "topup":
      return { text: "Пополнение", icon: TopupIcon };
    case "purchase":
      return { text: "Подписка", icon: PurchaseIcon };
    case "sub_update":
      return { text: "Апгрейд", icon: SubUpdateIcon };
    case "referral_bonus":
      return { text: "Бонус за друга", icon: ReferralBonusIcon };
    case "refund":
      return { text: "возврат денег", icon: RefundIcon };
    case "admin_adjustment":
      return { text: "Админские правки", icon: ReferralBonusIcon };
    default:
      return { text: "Разраб въебал говна", icon: ReferralBonusIcon };
  }
});
</script>

<template>
  <button class="paymentInfo">
    <div class="briefDescription">
      <IconPanel class="briefDescription__icon"><component :is="typePayment.icon" /></IconPanel>
      <div class="content">
        <div class="title">{{ typePayment.text }}</div>
        <div class="date">{{ datePayment }}</div>
      </div>
    </div>
    <div class="funds">
      <div class="amount" :style="{ color: paymentInfo.amount_kopecks > 0 ? 'var(--c-success)' : 'white' }">
        {{ paymentInfo.amount_kopecks > 0 ? "+" : "" }}{{ formatVolute(kopecksInRUB(paymentInfo.amount_kopecks)) }} ₽
      </div>
      <div class="remains">остаток {{ formatVolute(kopecksInRUB(paymentInfo.balance_after)) }} ₽</div>
    </div>
  </button>
</template>

<style scoped>
.paymentInfo {
  display: flex;
  background-color: var(--bg-cil-panel);
  padding: 12px;
  text-align: start;
  justify-content: space-between;
  width: 100%;
}
.paymentInfo .briefDescription {
  display: flex;
  gap: 5px;
}
.briefDescription .content {
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
}
.briefDescription .content .title {
  font-size: 14px;
  font-weight: 500;
  color: white;
}
.briefDescription .content .date {
  font-size: 10px;
  color: var(--c-main-text);
}
.paymentInfo .funds {
  display: flex;
  align-items: end;
  gap: 6px;
  flex-direction: column;
  justify-content: center;
}
.paymentInfo .funds .amount {
  font-size: 13px;
}
.paymentInfo .funds .remains {
  font-size: 11px;
  color: var(--c-main-text);
}
</style>
