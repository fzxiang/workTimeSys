import request from '/@/utils/request'

enum Api {
  // 获取全部客服
  GET_VERSION_INFO = '/getVersionInfo',
}

export function getVersionInfo(): Promise<any> {
  return request(Api.GET_VERSION_INFO)
}
