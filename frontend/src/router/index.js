import { createRouter, createWebHashHistory } from 'vue-router';
import UserPage from '../views/UserPage.vue';
import PageResult from '../views/PageResult.vue';

const routes = [
  {
    path: '/',
    name: 'UserPage',
    component: UserPage
  },
  {
    path: '/result',
    name: 'PageResult',
    component: PageResult,
    props: true  // 允许通过 props 传递参数
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
