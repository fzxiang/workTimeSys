import { localStore } from '/@/utils/local-storage'

const STORAGE_USER_NAME_KEY = 'userStore.user_name_en'

const setting = {
  // token key
  STORAGE_TOKEN_KEY: 'Authorization',
  // 存储用户数据 key
  STORAGE_USER_KEY: 'userStore',

  // token key
  STORAGE_USER_TOKEN_KEY: 'userStore.token',

  // 请求头 token name
  REQUEST_TOKEN_KEY: 'Authorization',
  EXPIRE_LOGIN_CODE: -2,

  // 用户关联版本
  GET_WORKING_VERSION: () => localStore.get(STORAGE_USER_NAME_KEY) + '_working_version',
  GET_PROJECT_VERSION: () => localStore.get(STORAGE_USER_NAME_KEY) + '_project_version',
  GET_WORKING: () => localStore.get(STORAGE_USER_NAME_KEY) + '_working',
  GET_PROJECT: () => localStore.get(STORAGE_USER_NAME_KEY) + '_project',
  GET_HOLIDAY: () => localStore.get(STORAGE_USER_NAME_KEY) + '_holiday',
}

export default setting
