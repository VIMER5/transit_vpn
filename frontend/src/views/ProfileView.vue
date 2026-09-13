<script setup lang="ts">
import miniProfileWidget from "@/widgets/users/miniProfile.widget.vue";
import { useUserStore } from "@/app/stores/user.store";
const UserStore = useUserStore();
</script>

<template>
  <miniProfileWidget
    class="miniProfileWidget"
    :first-and-last-name="UserStore.userFullName"
    :username="UserStore.username"
    :photo_url="UserStore.profile!.photo_url"
  />
</template>

<style scoped>
.miniProfileWidget {
  max-height: 60px;
}
</style>
