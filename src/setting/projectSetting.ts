import { localStore } from '/@/utils/local-storage'

// token key
export const STORAGE_TOKEN_KEY = 'Authorization'
// 存储用户数据 key
export const STORAGE_USER_KEY = 'userStore'
// token key
export const STORAGE_USER_TOKEN_KEY = 'userStore.token'

export const STORAGE_USER_NAME_KEY = 'userStore.user_name_en'

// 请求头 token name
export const REQUEST_TOKEN_KEY = 'Authorization'

// 用户关联版本
export const GET_WORKING_VERSION = () => localStore.get(STORAGE_USER_NAME_KEY) + '_working_version'
export const GET_PROJECT_VERSION = () => localStore.get(STORAGE_USER_NAME_KEY) + '_project_version'
