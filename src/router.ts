import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AuthPage from './views/AuthPage.vue';

// routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    name: 'Auth',
    component: AuthPage,
  },
  // fallback route
  {
    path: '/:pathMatch(.*)*',
    redirect: '/auth',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
