import request from '/@/utils/request'

const { VITE_APP_SSO_API } = import.meta.env
enum Api {
  // 获取全部客服
  GET_VERSION_INFO = '/getVersionInfo',
}

export function getVersionInfo(): Promise<any> {
  return request(VITE_APP_SSO_API + Api.GET_VERSION_INFO)
}
