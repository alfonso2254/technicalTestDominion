import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: () => import("../layouts/Main/Main.vue"),
    children: [
      {
        path: "/",
        name: "Dashboard",
        component: () => import("../views/Dashboard.vue"),
      },
      {
        path: "/showMovie/:id",
        name: "ShowMovie",
        component: () => import("../views/ShowMovie.vue"),
      }
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
