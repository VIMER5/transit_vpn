<script setup lang="ts">
import RUBIcon from "@/shared/icons/RUBIcon.vue";
import Button from "@/shared/ui/button.vue";
import IconPanel from "@/shared/ui/icon.panel.vue";
import uiCard from "@/shared/ui/ui.card.vue";

import { useUserStore } from "@/app/stores/user.store";

const userStor = useUserStore();
</script>

<template>
  <uiCard class="balans__panel">
    <div class="content">
      <div class="content-div">
        <IconPanel class="Icon"><RUBIcon /></IconPanel>
        <div class="money">{{ userStor.balanceSrt }} ₽</div>
      </div>

      <Button class="button">Пополнить</Button>
    </div>
  </uiCard>
</template>

<style scoped>
.balans__panel {
  background-color: var(--color-blue-850-50);
  padding: 13px 15px;
  container-type: inline-size;
}
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content-div {
  display: flex;
  align-items: center;
  gap: 14px;
}
.Icon {
  width: 16cqw;
  aspect-ratio: 1/1;
  padding: 15px 16px;
  border-radius: 16px;
  align-self: flex-start;
}
.money {
  font-family: "JetBrains Mono";
  font-size: 14px;
  font-weight: 400;
  color: white;
}
.button {
  border-radius: 14px;
  color: var(--c-money);
}
</style>
