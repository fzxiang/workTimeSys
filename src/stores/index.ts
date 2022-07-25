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
    setMonthData(key: number, value: any): void {
      this.monthData[key] = value
    },
    initMonthData(obj): void {
      this.monthData = obj
    },
    setCalendar(value: string) {
      this.calendar = value
    },
  },
})
