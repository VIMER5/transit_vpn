<script setup lang="ts">
import type { deviceList } from "@/app/types/sub.types";
import IconPanel from "@/shared/ui/icon.panel.vue";
import PhoneIcon from "@/shared/icons/phoneIcon.vue";
import CrossIcon from "@/shared/icons/crossIcon.vue";
import { computed } from "vue";
import DevicesIcon from "@/shared/icons/devicesIcon.vue";
import MonitorIcon from "@/shared/icons/monitorIcon.vue";

const props = defineProps<{
  data: deviceList;
}>();
const connectionDate = computed(() => new Date(props.data.createdAt).toLocaleString("ru-RU") ?? "-");
const icon = computed(() => {
  if (props.data.os.includes("iOS") || props.data.os.includes("Android")) return PhoneIcon;
  if (props.data.os.includes("Windows") || props.data.os.includes("Linux")) return MonitorIcon;
  return DevicesIcon;
});
const emit = defineEmits<{
  (e: "clickButtonDeauthorize", value: number): void;
}>();
</script>

<template>
  <div class="device">
    <div class="content">
      <IconPanel class="icon"><component :is="icon" /></IconPanel>
      <div class="text">
        <div class="title">{{ data.deviceName }}</div>
        <div class="date">Дата подключения: {{ connectionDate }}</div>
      </div>
    </div>
    <button class="deauthorizeButton" @click="emit('clickButtonDeauthorize', data.id)"><CrossIcon /></button>
  </div>
</template>

<style scoped>
.device {
  background-color: var(--bg-cil-panel);
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon {
  width: max-content;
}
.icon :deep(svg path) {
  stroke: var(--c-accent) !important;
}
.content {
  font-family: "JetBrains Mono";
  display: flex;
  align-items: center;
  gap: 5px;
}
.text {
  overflow: hidden;
  min-height: 0;
}
.title {
  color: white;
  font-weight: 500;
}
.date {
  margin-top: 6px;
  font-size: 9px;
}
.deauthorizeButton {
  padding: 5px;
  border: 1px solid var(--c-error);
  border-radius: 1000px;
  background-color: rgb(224, 66, 66, 20%);
}
</style>
