<script setup lang="ts">
import GiftsIcon from "@/shared/icons/giftsIcon.vue";
import UiCard from "@/shared/ui/ui.card.vue";
import Button from "@/shared/ui/buttons/button.vue";
import ShareLinkIcon from "@/shared/icons/shareLinkIcon.vue";
import IconPanel from "@/shared/ui/icon.panel.vue";
import StatIcon from "@/shared/icons/statIcon.vue";
import { computed, onMounted, ref } from "vue";
import type { UserReferralStatistics } from "@/app/types/user.types";
import { UserAPI } from "@/app/api/user.api";
import { useTelegram } from "@/composables/useTelegram";
const { openTelegramLink } = useTelegram();
const { getUserReferralStatistics } = UserAPI();

const referralStatistics = ref<UserReferralStatistics | null>(null);

onMounted(async () => {
  referralStatistics.value = await getUserReferralStatistics();
});
const referral_code = computed(() => {
  if (!referralStatistics.value) return "Na";
  return referralStatistics.value.referral_code ?? "Na";
});
const referralsCount = computed(() => {
  if (!referralStatistics.value) return "Na";
  return referralStatistics.value.referralsCount ?? "Na";
});
const sumReferralsBonus = computed(() => {
  if (!referralStatistics.value) return "Na";
  return (
    Number(referralStatistics.value.sumReferralsBonus / 100).toLocaleString("de-DE") ??
    referralStatistics.value.sumReferralsBonus ??
    "Na"
  );
});
const urlShare = computed(() => {
  if (!referralStatistics.value) return "Na";
  return referralStatistics.value.url ?? "Na";
});
function shareMessage() {
  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    `Привет. Подключись к VPN по моей ссылке 👇\n\n${urlShare.value}\n\nРаботает быстро и стабильно.`,
  )}`;

  openTelegramLink(shareUrl);
}
</script>

<template>
  <div class="referralPanelWidget">
    <UiCard class="referralPanelWidget__UiCard">
      <div class="content">
        <header class="content-header">
          <div class="title">
            <h2>Приглашение</h2>
            <h3>Ваш код</h3>
          </div>
          <GiftsIcon />
        </header>
        <main class="content-main">
          <div class="referralCode">{{ referral_code }}</div>
        </main>
        <footer class="content-footer">
          <hr class="hr" />
          <div class="referral__statistics">
            <div class="statistics__content">
              <div class="invited statistics__data">{{ referralsCount }}</div>
              <div class="earned statistics__data">{{ sumReferralsBonus }} ₽</div>
            </div>
            <RouterLink to="/profile/refstatistics">
              <IconPanel><StatIcon /></IconPanel>
            </RouterLink>
          </div>
          <Button class="buttonShareLink" @click="shareMessage"><ShareLinkIcon />Поделиться ссылкой</Button>
        </footer>
      </div>
    </UiCard>
  </div>
</template>

<style scoped>
.referralPanelWidget {
  position: relative;
}
.referralPanelWidget__UiCard {
  border-radius: 17px;
  padding: 20px 15px;
}
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title > h3 {
  margin-top: 6px;
  font-weight: 600;
  color: rgb(255, 255, 255);
  font-size: 16px;
}
.referralCode {
  margin-top: 20px;
  border-radius: 10px;
  border: 1px solid var(--c-accent);
  padding: 16px 10px;
  color: var(--c-accent);
  font-family: "JetBrains Mono";
  font-size: 16px;
}
.content-footer {
  margin-top: 15px;
}
.hr {
  position: absolute;
  left: 0;
  width: 100%;
  padding: 0;
  margin: 0;
  border: none;
  border-bottom: 2px dashed var(--c-line);
}
.referral__statistics {
  padding-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.statistics__content {
  display: flex;
  gap: 20px;
}
.statistics__data {
  display: flex;
  flex-direction: column;
  color: var(--c-accent);
  font-weight: 600;
  font-size: 16px;
  gap: 8px;
}
.statistics__data::after {
  color: var(--c-main-text);
  font-weight: 500;
  font-size: 12px;
}
.invited::after {
  content: "приглашено";
}
.earned::after {
  content: "заработано";
}
.buttonShareLink {
  width: 100%;
  background-color: var(--c-accent);
  color: var(--c-line);
  font-size: "Manrope";
  font-weight: 500;
  margin-top: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
</style>
