<script setup lang="ts">
import SubApi from "@/app/api/sub.api";
import { useSubStore } from "@/app/stores/sub.store";
import { useUserStore } from "@/app/stores/user.store";
import type { InfoCurrentUserSubResponse } from "@/app/types/sub.types";
import { useFormat } from "@/composables/useFormat";
import PrintSubIcon from "@/shared/icons/printSubIcon.vue";
import LoaderUI from "@/shared/ui/loaderUI.vue";
import ModalWindow from "@/shared/ui/modalWindow.vue";
import UiCard from "@/shared/ui/ui.card.vue";
import { onMounted, ref } from "vue";

const { getSubTrials } = SubApi();
const { formatDays } = useFormat();

const modalWindow = ref(false);

const subStore = useSubStore();
const userStore = useUserStore();

const isLoading = ref(false);

onMounted(async () => {
  await subStore.updateSubInfo();
});

async function trials() {
  try {
    isLoading.value = true;
    await getSubTrials();
    await subStore.updateSubInfo();
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
          <button @click="modalWindow = true" class="button__detailed">Подробнее</button>
          <ModalWindow @update:open="(d) => (modalWindow = d)" :open="modalWindow">dawdawd</ModalWindow>
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
.subInfo-footer::after {
  position: absolute;
  left: 0;
  content: "";
  border-bottom: 1.5px dashed var(--c-line);
  width: 100%;
  height: 1px;
}
.button__detailed {
  padding: 12px 0;
  margin-top: 2px;
  width: 100%;
  background-color: transparent;
  color: var(--c-main-text);
  font-family: "JetBrains Mono";
  font-size: 14px;
  cursor: pointer;
}
.redColoer {
  color: var(--c-error) !important;
}
</style>
