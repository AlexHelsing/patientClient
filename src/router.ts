import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AuthPage from './views/AuthPage.vue';
import DashboardPage from './views/DashboardPage.vue';
import MapViewPage from './views/MapViewPage.vue';
import DentistryPageVue from './views/DentistryPage.vue';

// routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    name: 'Auth',
    component: AuthPage,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
  },
  {
    path: '/mapview',
    name: 'MapView',
    component: MapViewPage,
  },
  {
    path: '/dentistry/:id',
    name: 'Dentistry',
    component: DentistryPageVue,
  },
  // fallback route
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
