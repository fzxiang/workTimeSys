import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { localStore } from '/@/utils/local-storage'
import { useUrlSearchParams } from '@vueuse/core'
NProgress.configure({ showSpinner: true })

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

const USER_STORE = 'userStore'
const USER_TOKEN_NAME = 'token'
const hasToken = (): boolean => {
  const userStore = localStore.get(USER_STORE)
  let res = false
  if (userStore) {
    if (userStore[USER_TOKEN_NAME]) {
      res = true
    }
  }
  return res
}

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
        localStore.set(USER_STORE, params, true)
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
    if (hasToken()) {
      await router.push({
        path: '/',
      })
      next({ name: 'HomeIndex' })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
