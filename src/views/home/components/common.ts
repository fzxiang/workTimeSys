// 节假日展示
import dayjs from 'dayjs'
import get from 'lodash.get'

export enum HolidayType {
  WORK = 0,
  HOLIDAY = 1,
  WEAKEN = 2,
}

export function getHolidayStatus(date, cacheStore) {
  // 当前选择日期
  const curDate = dayjs(date)
  const curYear = curDate.format('YYYY')
  const curMon = curDate.format('MMDD')
  const status = get(cacheStore.holiday, [curYear, curMon])
  if (status === HolidayType.WORK) return '班'
  else if (status === HolidayType.HOLIDAY) return '假'
  else if (status === HolidayType.WEAKEN) return '假'
  else return ''
}
