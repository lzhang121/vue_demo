import { createRouter, createWebHistory } from 'vue-router';
import UserForm from '../views/UserForm.vue';
import FormResult from '../views/FormResult.vue';

const routes = [
  {
    path: '/',
    name: 'UserForm',
    component: UserForm
  },
  {
    path: '/result',
    name: 'FormResult',
    component: FormResult,
    props: true  // 允许通过 props 传递参数
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
