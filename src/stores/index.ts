import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export const useStore = defineStore('__store__', {
  state: () => ({
    // light || dark
    mode: '',
    selectDate: '',
    workingVersionExpire: false,
    projectVersionExpire: false,
    monthData: {},
    calendar: 'close',
  }),
  persist: true,
  getters: {
    getMonthData() {
      return this.monthData
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
    // initMonthData(key, data): void {
    //   this.monthData[key] = data
    // },
    setCalendar(value: string) {
      this.calendar = value
    },
  },
})
