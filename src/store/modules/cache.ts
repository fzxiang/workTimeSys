import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import set from 'lodash.set'
import get from 'lodash.get'
import { localStore } from '/@/utils/local-storage'
import setting from '/@/setting/projectSetting'
import { useAppStoreWithOut } from './app'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
const { GET_PROJECT_VERSION, GET_WORKING_VERSION, GET_WORKING, GET_PROJECT, GET_HOLIDAY } = setting

interface Project {
  text: string
  value: string | number
}

interface Working {
  id?: number
  name?: string
  project_id: number
  project_name: string
  w_date: string
  status?: number
  w_value: number | string
}
interface Item {
  [key: string]: 0 | 1 | 2
}
interface Holiday {
  [key: string]: Item
}
interface CacheState {
  workingVersionExpire: boolean
  projectVersionExpire: boolean
  monthData: any
  project: Project[]
  working: Working[]
  workingVersion: number
  projectVersion: number
  holiday: Holiday
}

// 即时缓存
export const useCacheStore = defineStore(`__cache__`, {
  state: (): CacheState => ({
    workingVersionExpire: false,
    // 用户填写默认配置
    working: [],
    workingVersion: +(localStore.get(GET_WORKING_VERSION()) || 0),
    projectVersionExpire: false,
    // 项目配置
    project: [],
    projectVersion: +(localStore.get(GET_PROJECT_VERSION()) || 0),
    monthData: {},
    holiday: (localStore.get(GET_HOLIDAY()) || {}) as Holiday,
  }),
  // persist: true,
  getters: {
    getMonthData() {
      return this.monthData
    },
    getWorking() {
      return this.working.length > 0 ? this.working : localStore.get(GET_WORKING()) || []
    },
    getProject() {
      const appStore = useAppStoreWithOut()
      const project = this.project.length > 0 ? this.project : localStore.get(GET_PROJECT())
      const curDate = dayjs(appStore.selectDate)

      const filter = project.filter((item) => {
        const start = dayjs(item.start_time)
        const end = dayjs(item.close_time)
        return curDate.isSameOrAfter(start) && curDate.isSameOrBefore(end)
      })
      return filter.map((item) => {
        return {
          value: item.id,
          text: item.name,
        }
      })
    },
    showFormData() {
      const today = dayjs(new Date())
      return today.isAfter(this.selectDate)
    },
  },
  actions: {
    // 修改设置月份数据
    setMonthData(key: string, value: any): void {
      this.monthData[key] = value
    },
    // 修改设置日数据
    setMonthDayData(month: string | number, day: string | number, value: any): void {
      this.monthData[month][day] = value
    },
    setMonthWorking(month: string | number, day: string | number, value: any): void {
      set(this.monthData, [month, 'working', day], value)
    },
    delMonthWorking(month: string | number, day: string | number): void {
      const working = get(this.monthData, [month, 'working'])
      Reflect.deleteProperty(working, day)
    },
    setMonthStatus(month: string | number, day: string | number, value: any): void {
      const old = get(this.monthData, [month, 'status', day])
      set(this.monthData, [month, 'status', day], {
        ...old,
        ...value,
      })
    },
    delMonthStatus(month: string | number, day: string | number): void {
      const old = get(this.monthData, [month, 'status'])
      Reflect.deleteProperty(old, day)
    },
    setCalendar(value: string) {
      this.calendar = value
    },
    setWorking<T>(value: T[] | Working[]): void {
      this.working = value
      localStore.set(GET_WORKING(), value, false)
    },
    setProject<T>(value: T[] | Project[]): void {
      this.project = value
      localStore.set(GET_PROJECT(), value, false)
    },
    setWorkingVersion(value: number) {
      this.workingVersion = value
      localStore.set(GET_WORKING_VERSION(), value, false)
    },
    setProjectVersion(value: number) {
      this.projectVersion = value
      localStore.set(GET_PROJECT_VERSION(), value, false)
    },
    setWorkingVersionExpire(value: boolean) {
      this.workingVersionExpire = value
    },
    setProjectVersionExpire(value: boolean) {
      this.projectVersionExpire = value
    },
    setHoliday(value: Holiday) {
      this.holiday = value
      localStore.set(GET_HOLIDAY(), value, false)
    },
  },
})
