import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/red",
    name: "TrafficLight",
    component: () => import("@/views/TrafficLight"),
  },
  {
    path: "/red",
    name: "LightRed",
    props: { bright: true, nextLight: "/yellow" },
    // component: () => import("@/components/LightRed"),
  },
  {
    path: "/yellow",
    name: "TrafficYellow",
    props: { bright: true, nextLight: "/green" },
    // component: () => import("@/components/LightYellow"),
  },
  {
    path: "/green",
    name: "TrafficGreen",
    props: { bright: true, nextLight: "/yellow" },
    // component: () => import("@/components/LightGreen"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
