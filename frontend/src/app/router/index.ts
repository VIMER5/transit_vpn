import { createRouter, createWebHistory } from "vue-router";
import Main from "@/app/layout/main.vue";
import HomeView from "@/views/HomeView.vue";
import ProfileView from "@/views/ProfileView.vue";
import TariffsView from "@/views/TariffsView.vue";
import ProfileLayout from "@/app//layout/profile.layout.vue";
import DeviceView from "@/views/deviceView.vue";
import SubSettingsView from "@/views/subSettingsView.vue";

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
          path: "tariffs",
          name: "tariffs",
          component: TariffsView,
        },
        {
          path: "devices",
          name: "devices",
          component: DeviceView,
        },
        {
          path: "profile",
          component: ProfileLayout,
          children: [
            {
              path: "",
              name: "profile",
              component: ProfileView,
            },
            { path: "refstatistics", name: "refstatistics", component: TariffsView },
            { path: "payment_history", name: "paymentHistory", component: TariffsView },
            { path: "sub_settings", name: "subSetting", component: SubSettingsView },
          ],
        },
      ],
    },
  ],
});

export default router;
