<script setup lang="ts">
import homeIcon from "@/shared/icons/homeIcon.vue";
import diviceIcon from "@/shared/icons/diviceIcon.vue";
import cartIcon from "@/shared/icons/cartIcon.vue";
import userIcon from "@/shared/icons/userIcon.vue";
</script>

<template>
  <div class="navBar">
    <nav class="nav">
      <ul class="nav-ul">
        <li>
          <RouterLink class="router-a" to="/"> <homeIcon class="router-a-svg" /> Главная</RouterLink>
        </li>
        <li>
          <RouterLink class="router-a" to="/tariffs"><cartIcon class="router-a-svg" /> Тарифы</RouterLink>
        </li>
        <li>
          <RouterLink class="router-a" to="/devices"><diviceIcon class="router-a-svg" /> Устройства</RouterLink>
        </li>
        <li>
          <RouterLink class="router-a" to="/profile"><userIcon class="router-a-svg" /> Профиль</RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.nav {
  padding: 19px 0;
  background-color: var(--bg-main-panel);
  border-top: 0.5px solid var(--c-line);
}
.nav-ul {
  display: flex;
  justify-content: space-around;
}

.router-a {
  color: var(--c-main-text);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  gap: 3px;
  font-family: "Manrope";
  font-weight: normal;
  font-style: normal;
}
.router-a[href="/"].router-link-exact-active,
.router-a:not([href="/"]).router-link-active {
  color: var(--c-accent);
}
.router-a[href="/"].router-link-exact-active :deep(.router-a-svg) path,
.router-a:not([href="/"]).router-link-active :deep(.router-a-svg) path {
  stroke: var(--c-accent) !important;
}
.router-a-svg {
  width: 25px;
}
</style>
