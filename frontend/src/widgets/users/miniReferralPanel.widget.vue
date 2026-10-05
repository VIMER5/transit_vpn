<script setup lang="ts">
import { useUserStore } from "@/app/stores/user.store";
import TicketIcon from "@/shared/icons/ticketIcon.vue";
import SmallWidgetAnIcon from "@/shared/ui/small.widget.an.icon.vue";

const userStore = useUserStore();
</script>

<template>
  <RouterLink to="/profile">
    <SmallWidgetAnIcon>
      <template v-slot:icon><TicketIcon /> </template>
      <template v-slot:main>
        <div class="ref">
          <h2>Реф.код:</h2>
          <h3>{{ userStore.referral_code }}</h3>
        </div>
      </template>
    </SmallWidgetAnIcon>
  </RouterLink>
</template>

<style scoped>
.ref {
  font-family: "JetBrains Mono";
  color: var(--c-main-text);
}
.ref h3 {
  margin-top: 6px;
  color: var(--c-accent);
  font-size: 15px;
}
</style>
