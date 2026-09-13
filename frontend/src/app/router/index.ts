import { createRouter, createWebHistory } from "vue-router";
import Main from "@/app/layout/main.vue";
import HomeView from "@/views/HomeView.vue";
import ProfileView from "@/views/ProfileView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Main,
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
        },
        {
          path: "/tariffs",
          name: "tariffs",
          component: import("../../views/AboutView.vue"),
        },
        {
          path: "/devices",
          name: "devices",
          component: import("../../views/AboutView.vue"),
        },
        {
          path: "/profile",
          name: "profile",
          component: ProfileView,
        },
      ],
    },
  ],
});

export default router;
