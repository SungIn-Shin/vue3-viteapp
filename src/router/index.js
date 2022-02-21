import { createRouter, createWebHistory } from 'vue-router';
// import { createRouter } from 'vue-router';
import process from 'process';

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/login',
    component: () => import('../views/LoginPage.vue'),
  },
  {
    path: '/users',
    meta: { auth: true, role: 'super-admin' },
    component: () => import('../views/UserListPage.vue'),
  },
  {
    path: '/home',
    component: () => import('../views/Home.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
