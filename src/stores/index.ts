import { defineStore } from 'pinia'

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
