import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: true })

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  {
    path: '/',
    component: () => import('/@/views/CheckToken.vue'),
    meta: { title: '工时系统' },
  },
  {
    path: '/home',
    component: () => import('/@/views/home/index.vue'),
    meta: { title: '工时系统' },
  },
  {
    path: '/login',
    component: () => import('/@/views/login/index.vue'),
    meta: { title: '工时系统-登录' },
  },
  { path: '/:path(.*)', component: () => import('/@/views/NotFound.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  },
})

router.beforeEach((_to, _from, next) => {
  NProgress.start(); // start progress bar
  next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
