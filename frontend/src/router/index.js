import { createRouter, createWebHashHistory } from 'vue-router';
import FormPage from '../views/FormPage.vue';
import SuccessPage from '../views/SuccessPage.vue';
import FailurePage from '../views/FailurePage.vue';
import LoadingPage from '../views/LoadingPage.vue';
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
  },
  {
    path: '/loading',
    name: 'LoadingPage',
    component: LoadingPage,
    props: true  // 允许通过 props 传递参数
  },
  {
    path: '/success',
    name: 'SuccessPage',
    component: SuccessPage,
    props: true  // 允许通过 props 传递参数
  },
  {
    path: '/failure',
    name: 'FailurePage',
    component: FailurePage,
    props: true  // 允许通过 props 传递参数
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
