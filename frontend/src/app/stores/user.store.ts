import { ref, computed } from "vue";
import { defineStore } from "pinia";
import $api from "@/app/api/axios";
import type { UserProfile } from "@/app/types/user.types";
export const useUserStore = defineStore("UserStore", () => {
  const profile = ref<UserProfile | null>(null);
  const isProfileLoading = ref(false);

  async function fetchUserProfile() {
    isProfileLoading.value = true;
    try {
      await fetch();
    } catch (error) {
      profile.value = null;
    } finally {
      isProfileLoading.value = false;
    }
  }
  async function fetch() {
    const { data } = await $api.get<UserProfile>("/users");
    profile.value = data;
  }

  const userFullName = computed(() => {
    if (!profile.value) return "";
    return `${profile.value.first_name} ${profile.value.last_name}`.trim();
  });
  const username = computed(() => {
    if (!profile.value) return "";
    return `@${profile.value.username}`.trim();
  });
  const balanceInRUB = computed(() => {
    if (!profile.value) return 0;
    return profile.value.balance / 100;
  });
  const balanceSrt = computed(() => {
    if (!profile.value) return "";
    return Number(balanceInRUB.value).toLocaleString("de-DE") ?? balanceInRUB.value;
  });

  return { profile, userFullName, username, balanceSrt, balanceInRUB, fetchUserProfile, fetch };
});
