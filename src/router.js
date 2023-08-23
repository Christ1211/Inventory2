import { createRouter, createWebHistory } from 'vue-router';
import Homepage from './components/HomePage.vue';
import InputItems from './components/InputItems.vue';
import RegisterPage from './components/RegisterPage.vue';
import AdminPage from './components/AdminPage.vue';
import AdminInput from './components/AdminInput.vue';

const routes = [
  { path: '/', component: Homepage },
  { path: '/input-items', component: InputItems },
  { path: '/register', component: RegisterPage },
  { path: '/AdminPage', component: AdminPage },
  { path: '/AdminInput', component: AdminInput },
 // Use 'component' instead of 'components'

  {
    path: '/admin',
    component: () => import('@/components/AdminPage.vue'), // Replace with your component's import
    meta: {
      requiresAdmin: true, // Apply the navigation guard to this route
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
