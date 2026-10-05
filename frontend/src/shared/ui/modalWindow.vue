<script setup lang="ts">
const { open = false } = defineProps<{
  open?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
}>();
</script>

<template>
  <Teleport :disabled="!open" to="body">
    <div v-if="open" @mousedown.left.self="emit(`update:open`, false)" class="bc__baseModel">
      <div class="baseModel"><slot></slot></div>
    </div>
  </Teleport>
</template>

<style scoped>
.bc__baseModel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 9999;
}
.baseModel {
  background-color: var(--bg-modal);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: max-content;
  max-width: calc(100% - 40px);
  padding: 25px 19px;
  border-radius: 10px;
  text-align: center;
  align-items: center;
  cursor: default;
}
</style>
