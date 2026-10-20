<script setup lang="ts">
import { isServerError } from "@/app/api/axios";
import SubApi from "@/app/api/sub.api";
import type { deviceLimits } from "@/app/types/sub.types";
import DevicesIcon from "@/shared/icons/devicesIcon.vue";
import SmallWidgetAnIcon from "@/shared/ui/small.widget.an.icon.vue";
import { onMounted, ref } from "vue";

const isLoading = ref(true);
const deviceLimits = ref<deviceLimits | null>();
const { getDeviceLimit } = SubApi();
onMounted(async () => {
  try {
    const limitsResult = await getDeviceLimit();
    if (limitsResult === null) {
      deviceLimits.value = null;
    } else if (isServerError(limitsResult)) {
    } else {
      deviceLimits.value = limitsResult;
    }
    isLoading.value = false;
  } finally {
  }
});
</script>

<template>
  <RouterLink to="/devices">
    <SmallWidgetAnIcon>
      <template v-slot:icon><DevicesIcon class="icon" /> </template>
      <template v-slot:main>
        <div v-if="deviceLimits" class="ref">
          <h2>
            <span>{{ deviceLimits.countDivice }}</span
            >/{{ deviceLimits.deviceLimitSub }}
          </h2>
          <h3>Подключено</h3>
        </div>
        <div v-else>Нет данных</div>
      </template>
    </SmallWidgetAnIcon>
  </RouterLink>
</template>

<style scoped>
.ref {
  font-family: "JetBrains Mono";
  color: var(--c-main-text);
  font-size: 16px;
}
.ref h2 span {
  font-size: 20px;
  color: #abb6cf;
}
.ref h3 {
  margin-top: 6px;
  font-size: 13px;
}
</style>
