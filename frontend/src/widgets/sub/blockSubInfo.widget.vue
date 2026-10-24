<script setup lang="ts">
import SubApi from "@/app/api/sub.api";
import { useSubStore } from "@/app/stores/sub.store";
import { useUserStore } from "@/app/stores/user.store";
import { useFormat } from "@/composables/useFormat";
import PrintSubIcon from "@/shared/icons/printSubIcon.vue";
import LoaderUI from "@/shared/ui/loaderUI.vue";
import UiCard from "@/shared/ui/ui.card.vue";
import { onMounted, ref } from "vue";

const { getSubTrials } = SubApi();
const { formatDays } = useFormat();
const { formatMonths } = useFormat();

const { isSetting = false, dataUpdateMounted = true } = defineProps<{
  isSetting?: boolean;
  dataUpdateMounted?: boolean;
}>();

const subStore = useSubStore();
const userStore = useUserStore();

const isLoading = ref(false);

onMounted(async () => {
  if (dataUpdateMounted) await updateData();
});

async function updateData() {
  await subStore.updateSubInfo();
  await userStore.updateBalance();
}

async function trials() {
  try {
    isLoading.value = true;
    await getSubTrials();
    await updateData();
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <UiCard class="bg">
    <div v-if="!isLoading">
      <div v-if="subStore.sub" class="subInfo">
        <header class="subInfo-header">
          <div class="content">
            <h2>ПРОПУСК · ID. {{ subStore.sub.id }}</h2>
            <h3 :class="{ redColoer: !subStore.subIsActive }" class="statusSub">{{ subStore.strStatusSub }}</h3>
          </div>
          <PrintSubIcon :is-active="subStore.subIsActive" />
        </header>
        <main>
          <ul class="sub__deadlinesInfo">
            <li class="left">
              Осталось<span :class="{ redColoer: subStore.subLeftDays == 0 }">{{
                formatDays(subStore.subLeftDays)
              }}</span>
            </li>
            <li class="validUntil">
              Действует до<span>{{ subStore.subValidUntil }}</span>
            </li>
          </ul>
        </main>
        <footer class="subInfo-footer">
          <div class="perforation"></div>
          <RouterLink v-if="!isSetting" class="toSettings" to="/profile/sub_settings">Подробнее</RouterLink>
          <ul class="subDetails" v-else>
            <li>
              <span class="title">Срок</span>
              <span class="value">{{
                subStore.sub.isTrials ? "Пробный" : formatMonths(subStore.sub.term_months)
              }}</span>
            </li>
            <li>
              <span class="title">Устройств</span>
              <span class="value">{{ subStore.sub.device_limit }}</span>
            </li>
          </ul>
        </footer>
      </div>
      <div v-else class="isNoSub">
        <h2>У вас пока нет транзита</h2>
        <div class="trials" v-if="!userStore.profile?.trial_period">
          <h4>Вам доступен тестовый период на 3 дня.</h4>
          <button @click="trials" class="button__trialPeriod">Активировать</button>
        </div>
      </div>
    </div>
    <div class="load" v-else><LoaderUI /></div>
  </UiCard>
</template>

<style scoped>
.subDetails {
  font-family: "JetBrains Mono";
  font-size: 14px;
  margin-top: 7px;
  margin-bottom: 13px;
  display: flex;
  gap: 35px;
}
.subDetails li {
  display: flex;
  gap: 7px;
  flex-direction: column;
}
.subDetails li .value {
  color: white;
}
.perforation {
  margin: 0px -20px;
  height: 1px;
  background-image: repeating-linear-gradient(90deg, var(--c-line) 0 6px, transparent 6px 12px);
}
.load {
  text-align: center;
  padding-bottom: 15px;
}
.isNoSub > h2 {
  color: white;
  margin-bottom: 10px;
}
.button__trialPeriod {
  padding: 12px 0;
  margin-top: 10px;
  width: 100%;
  background-color: transparent;
  color: var(--c-accent);
  font-family: "JetBrains Mono";
  font-size: 14px;
  cursor: pointer;
}
.bg {
  overflow: hidden;
  border-radius: 17px;
  font-family: "JetBrains Mono";
  font-weight: 400;
  padding: 20px 15px;
  padding-bottom: 0px;
  position: relative;
}

.statusSub {
  color: white;
  margin-top: 10px;
  font-size: 16px;
}
.subInfo-header {
  display: flex;
  justify-content: space-between;
}
.sub__deadlinesInfo {
  display: flex;
  gap: 60px;
  margin-top: 14px;
}
.sub__deadlinesInfo > li {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
}
.sub__deadlinesInfo > .left > span {
  color: var(--c-accent);
}
.sub__deadlinesInfo > .validUntil > span {
  color: white;
}
.subInfo-footer {
  margin-top: 20px;
}
.toSettings {
  font-family: "JetBrains Mono";
  color: var(--c-main-text);
  text-align: center;
  width: 100%;
  display: block;
  padding: 12px 0;
}
.redColoer {
  color: var(--c-error) !important;
}
</style>
