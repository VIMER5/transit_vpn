<script setup lang="ts">
import { useAppStore } from "@/app/stores/app.store";
import ShieldAlert from "@/shared/icons/shieldAlert.vue";
import Button from "@/shared/ui/buttons/button.vue";
const appStore = useAppStore();

function openSupport() {}
</script>

<template>
  <div class="ban">
    <div class="preview">
      <img src="/img/banImg.jpg" alt="" />
    </div>
    <div class="content">
      <h1 class="content-h1"><ShieldAlert /> ПОГРАНИЧНЫЙ КОНТРОЛЬ</h1>
      <main class="content-main">
        <div class="content-main-h2">Проход временно закрыт.</div>
        <p class="content-main-p">
          Ваш пропуск приостановлен, а дальнейшее пересечение границы запрещено до выяснения обстоятельств.
        </p>
      </main>
      <footer class="content-footer">
        <div class="warn__accent">
          <h2 class="warn__accent-h2">ПОСТАНОВЛЕНИЕ № 403</h2>
          <p class="warn__accent-p">Причина: нарушение правил пересечения цифровых границ.</p>
          <spn>Ваш гид Transit уже уведомлён. Но делает вид, что не знаком с вами.</spn>
        </div>
        <a :href="appStore.PayLoad?.urlSupport" class="support-btn">Поддержка</a>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.ban {
  padding: 15px;
}
.preview {
  height: 34dvh;
  border-radius: 10px;
  overflow: hidden;
}
.preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}
.content {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.content-h1 {
  font-size: 16px;
  color: var(--c-accent);
  display: flex;
  gap: 10px;
  align-items: center;
}
.content-main {
  color: white;
  font-size: 12px;
}
.content-main-h2 {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 10px;
}
p {
  line-height: 15px;
}
.warn__accent {
  border: 1px solid var(--c-accent);
  padding: 10px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 10px;
}
.warn__accent-h2 {
  color: var(--c-accent);
  font-size: 14px;
}
.warn__accent-p {
  color: white;
  font-size: 14px;
}
.support-btn {
  display: block;
  text-align: center;
  box-sizing: border-box;
  padding: 14px;
  border-radius: 14px;
  background-color: var(--bg-button);
  border: 1px solid var(--c-line);
  font-family: "JetBrains Mono";
  font-size: 14px;
  font-weight: 400;
  height: max-content;
  line-height: inherit;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
}
</style>
