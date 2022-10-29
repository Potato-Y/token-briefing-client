import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import HomeView from '../views/Home/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import(/* webpackChunkName: "setting" */ '../components/SettingComp.vue'),
  },
  {
    path: '/opensource',
    name: 'opensource',
    component: () => import(/* webpackChunkName: "opensource" */ '../views/UsedOpenSourceView.vue'),
  },
];

const router = createRouter({
  // 개발 환경에선 createWebHistory, 실제 빌드된 환경에선 createWebHashHistory를 제공
  history: process.env.NODE_ENV == 'development' ? createWebHistory(process.env.BASE_URL) : createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
