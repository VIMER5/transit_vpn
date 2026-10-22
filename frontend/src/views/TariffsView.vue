<script setup lang="ts">
import { onMounted, ref } from "vue";
import ModalWindow from "@/shared/ui/modalWindow.vue";
import { useAppStore } from "@/app/stores/app.store";
import SubBuilderWiget from "@/widgets/sub/subBuilder.wiget.vue";

const isOpenModal = ref(true);
const appStore = useAppStore();

onMounted(async () => {
  await appStore.fetchPricing();
});
</script>

<template>
  <main class="tariffs__view">
    <SubBuilderWiget :pricing="appStore.pricing" />
    <ModalWindow v-model:open="isOpenModal">
      <div class="tariffs__warn">
        <h3>Внимание</h3>

        <p>При покупке новой подписки текущая подписка будет аннулирована.</p>
      </div>
    </ModalWindow>
  </main>
</template>

<style scoped>
.h1 {
  font-family: "JetBrains Mono";
  font-size: 14px;
  font-weight: 500;
  color: white;
}

.title-with-lines {
  display: flex;
  align-items: center;
  text-align: center;
  gap: 7px;
  width: 100%;
  font-size: 15px;
  font-weight: 500;
}
.plans {
  margin-top: 15px;
}
.title-with-lines::before,
.title-with-lines::after {
  content: "";
  flex: 1;
  height: 1px;
  background-image: repeating-linear-gradient(90deg, var(--c-line) 0 6px, transparent 6px 12px);
}
.mt-10 {
  margin-top: 10px;
}
.planBuilder {
  margin-top: 18px;
}

.tariffs__warn > h3 {
  margin-bottom: 20px;
  color: var(--c-accent);
  font-size: 20px;
}
.tariffs__warn {
  font-size: 16px;
}
.tariffs__warn > p {
  font-size: 15px;
  text-align: start;
  margin-bottom: 15px;
}
.tariffs__warn > ul {
  text-align: start;
}
.tariffs__warn > ul li {
  margin-bottom: 10px;
}
.tariffs__warn > ul > li > span {
  color: var(--c-accent);
}
</style>
