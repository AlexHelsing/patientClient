import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AuthPage from './views/AuthPage.vue';
import DashboardPage from './views/DashboardPage.vue';
import MapViewPage from './views/MapViewPage.vue';
import DentistryPageVue from './views/DentistryPage.vue';
import { useUserStore } from './stateStores/userStore';

// routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    name: 'Auth',
    component: AuthPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/mapview',
    name: 'MapView',
    component: MapViewPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/dentistry/:id',
    name: 'Dentistry',
    component: DentistryPageVue,
    meta: { requiresAuth: true },
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

router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore();

  // Run the init only if the user state is not already set
  if (!userStore.isLoggedIn) {
    await userStore.init();
  }

  // if user is logged in and tries to access auth page
  if (to.name === 'Auth' && userStore.isLoggedIn) {
    return next({ name: 'Dashboard' }); // Use 'return' to exit the guard
  }

  // If the route requires auth and the user is not logged in, redirect to auth
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !userStore.isLoggedIn
  ) {
    return next({ name: 'Auth' }); // Use 'return' to exit the guard
  }

  // If none of the above conditions met, proceed with the navigation
  return next();
});

export default router;
