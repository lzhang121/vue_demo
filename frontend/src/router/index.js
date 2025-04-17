import { createRouter, createWebHashHistory } from 'vue-router';
import FormPage from '../views/FormPage.vue';
import DownloadPage from '../views/DownloadPage.vue';

const routes = [
  {
    path: '/',
    name: 'FormPage',
    component: FormPage
  },
  {
    path: '/download',
    name: 'DownloadPage',
    component: DownloadPage,
    props: true  // 允许通过 props 传递参数
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
