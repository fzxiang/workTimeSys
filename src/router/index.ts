import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { localStore } from '/@/utils/local-storage'
import setting from '/@/setting/projectSetting'
import { useUrlSearchParams, useTitle } from '@vueuse/core'
NProgress.configure({ showSpinner: true })

const webTitle = useTitle()
const { STORAGE_USER_KEY, STORAGE_USER_TOKEN_KEY } = setting
/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
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
  {
    path: '/stats',
    name: 'WorkStats',
    component: () => import('/@/views/stats/index.vue'),
    meta: { title: '统计' /*, ignoreAuth: true*/ },
  },
  {
    path: '/helper',
    name: 'HelperIndex',
    component: () => import('/@/views/helper/index.vue'),
    meta: { title: '说明' /*, ignoreAuth: true*/ },
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

const { VITE_APP_API_BASE_URL } = import.meta.env

// 登录
router.beforeResolve(async (_to, _from, next) => {
  NProgress.start() // start progress bar
  if (_to.meta.ignoreAuth) next()
  if (_to.path === '/login') {
    hasToken()
      ? next({ name: 'HomeIndex' })
      : (location.href = location.origin + VITE_APP_API_BASE_URL + '/ssoLogin')
    return true
  }
  // 缓存有token
  if (hasToken()) {
    next()
    return true
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
      location.href = location.origin + VITE_APP_API_BASE_URL + '/ssoLogin'
      return false
    }
  }
  next()
})

router.afterEach(async (_to, _from) => {
  NProgress.done() // finish progress bar
  webTitle.value = _to?.meta?.title as string
})
