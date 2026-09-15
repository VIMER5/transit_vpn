<script setup lang="ts"></script>

<template>
  <div class="ui__cart">
    <slot />
  </div>
</template>

<style scoped>
.ui__cart {
  background-color: var(--color-blue-850-92);
  border-radius: 8px;
  padding: 15px;
  border: 1px solid var(--c-line);
}
</style>
