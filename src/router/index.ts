import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { localStore } from '/@/utils/local-storage'
import { STORAGE_USER_KEY, STORAGE_USER_TOKEN_KEY, GET_PROJECT_VERSION, GET_WORKING_VERSION } from '/@/setting/projectSetting'
import { getVersionInfo } from '/@/api/sso'
import { useUrlSearchParams } from '@vueuse/core'
import { useStore } from '/@/stores'
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
  // 页面路由切换 和 刷新页面 拿版本号校验
  await checkStorageVersion()
})

router.afterEach(async (_to, _from) => {

  NProgress.done() // finish progress bar
})

async function checkStorageVersion() {
  const store = useStore()
  const res = await getVersionInfo()
  if (res.data) {
    const WORKING_VERSION = GET_WORKING_VERSION()
    const PROJECT_VERSION = GET_PROJECT_VERSION()
    const { working_version, project_version } = res.data
    const [local_working_version, local_project_version] = [
      localStore.get(WORKING_VERSION),
      localStore.get(PROJECT_VERSION),
    ]
    if (local_working_version) {
      changeStore(store, 'workingVersionExpire', local_working_version < working_version)
    }
    // 为0 或 undefined
    else {
      store.workingVersionExpire = true
    }
    if (local_project_version) {
      changeStore(store, 'projectVersionExpire', local_project_version < project_version)
    }
    // 为0 或 undefined
    else {
      store.projectVersionExpire = true
    }
    // localStore.set(WORKING_VERSION, working_version, false)
    // localStore.set(PROJECT_VERSION, project_version, false)
  }
  console.log('页面路由切换 和 刷新页面', res)
}

function changeStore(store, key, value) {
  store[key] = value
}
