import request from '/@/utils/request'

enum Api {
  // 获取全部客服
  GET_USER = '/getUserDefaultConfig',
  GET_PROJECT = '/getCommonConfig',
  GET_MONTH_HOURS = '/getMonthWorkingHours',
  SUBMIT = '/saveWorkingHours',
}

export function getUserConfig(): Promise<any> {
  return request(Api.GET_USER)
}

export function getProjectConfig(): Promise<any> {
  return request(Api.GET_PROJECT)
}

export function getMonthWorkingHours(params): Promise<any> {
  return request.get(Api.GET_MONTH_HOURS, { params})
}

export function saveWorkingHours(data): Promise<any> {
  return request.post(Api.SUBMIT, data)
}
