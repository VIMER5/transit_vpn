<script setup lang="ts">
import navWidget from "@/widgets/nav.widget.vue";
import { useNotificationStore } from "../stores/notification.store";
const NotificationStore = useNotificationStore();
</script>

<template>
  <div class="mainLayour">
    <div class="Notification">
      <ul class="Notification-ul">
        <li v-for="item in NotificationStore.notification" :id="item.id" :style="{ color: `var(${item.textColor})` }">
          {{ item.text }}
        </li>
      </ul>
    </div>
    <div class="content">
      <RouterView />
      <header class="header">Transit VPN</header>
    </div>
    <navWidget />
  </div>
</template>

<style scoped>
.mainLayour {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
.Notification {
  position: absolute;
  right: 10px;
  top: 20px;
  z-index: 10000;
}
.Notification-ul {
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-height: 200px;
  overflow: hidden;
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: end;
}
.Notification-ul li {
  width: max-content;
  padding: 10px;
  background-color: var(--bg-main-panel);
  border-radius: 10px;
  border: 1px solid var(--c-line);
  animation: Notification 0.3s ease-out forwards;
}

@keyframes Notification {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
.content {
  flex: 1;
  overflow: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE и Edge */
  margin: 20px 20px 0px 20px;
}
.content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
.header {
  text-align: center;
  margin-top: 10px;
  font-size: 8px;
}
</style>
