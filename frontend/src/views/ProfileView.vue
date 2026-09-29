<script setup lang="ts">
import miniProfileWidget from "@/widgets/users/miniProfile.widget.vue";
import { useUserStore } from "@/app/stores/user.store";
import ReferralPanelWidget from "@/widgets/users/referralPanel.widget.vue";
const UserStore = useUserStore();
</script>

<template>
  <miniProfileWidget
    class="miniProfileWidget"
    :first-and-last-name="UserStore.userFullName"
    :username="UserStore.username"
    :photo_url="UserStore.photoUrl"
  />
  <ReferralPanelWidget class="referralPanel" />

  <ul class="usefulLinks">
    <li class="border-bottom"><div class="content">Поддержка</div></li>
    <li class="border-bottom">
      <RouterLink class="content" to="/profile/payment_history">История платежей</RouterLink>
    </li>
    <li><div class="content">Условия сервиса</div></li>
  </ul>
</template>

<style scoped>
.miniProfileWidget {
  max-height: 60px;
}
.referralPanel {
  margin-top: 20px;
}
.usefulLinks {
  background-color: var(--bg-cil-panel);
  border-radius: 8px;
  border: 1px solid var(--c-line);
  color: white;
  margin-top: 31px;
}
.usefulLinks > li > .content {
  padding: 14px;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.usefulLinks > li > .content::after {
  position: absolute;
  right: 15px;
  content: "❯";
  color: var(--c-line);
  font-size: 15px;
}
li.border-bottom {
  border-bottom: 1px solid var(--c-line);
}
</style>
