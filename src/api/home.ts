import request from '/@/utils/request'

enum Api {
  // 获取全部客服
  GET_USER = '/getUserDefaultConfig',
  GET_PROJECT = '/getCommonConfig',
}

export function getUserConfig(): Promise<any> {
  return request(Api.GET_USER)
}

export function getProjectConfig(): Promise<any> {
  return request(Api.GET_PROJECT)
}
