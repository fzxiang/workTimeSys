import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { localStore } from '/@/utils/local-storage'
import setting from '/@/setting/projectSetting'
import { useUrlSearchParams } from '@vueuse/core'
NProgress.configure({ showSpinner: true })
const { STORAGE_USER_KEY, STORAGE_USER_TOKEN_KEY } = setting
/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  // {
  //   path: '/',
  //   redirect: '/home',
  //   component: () => import('/@/views/CheckToken.vue'),
  //   meta: { title: '工时系统' },
  // },
  {
    path: '/',
    name: 'HomeIndex',
    component: () => import('/@/views/home/index.vue'),
    meta: { title: '工时系统' },
  },
  {
    path: '/login',
    name: 'LoginIndex',
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

const USER_TOKEN_NAME = 'token'
const hasToken = (): boolean => {
  const token = localStore.get(STORAGE_USER_TOKEN_KEY)
  return !!token
}

// 登录
router.beforeEach(async (_to, _from, next) => {
  NProgress.start() // start progress bar
  console.log(_to)
  if (_to.path === '/') {
    // 缓存有token
    if (hasToken()) {
      next()
    }
    // 没有缓存token, 取URL
    else {
      const params = useUrlSearchParams('history')
      if (params[USER_TOKEN_NAME]) {
        console.log('user token 写入缓存', params)
        localStore.set(STORAGE_USER_KEY, params, true)
        await router.push({
          path: '/',
        })
        next()
      }
      // URL 不存在则剔除
      else {
        next({ name: 'LoginIndex' })
      }
    }
  } else if (_to.path === '/login') {
    hasToken() ? next({ name: 'HomeIndex' }) : next()
  } else {
    next()
  }
})

router.afterEach(async (_to, _from) => {
  NProgress.done() // finish progress bar
})
