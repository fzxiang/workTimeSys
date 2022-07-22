import { defineStore, createPinia } from 'pinia'

export const useStore = defineStore('__store__', {
  state: () => ({
    // light || dark
    mode: '',
    selectDate: '',
    workingVersionExpire: false,
    projectVersionExpire: false,
    monthData: {},
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
  },
})
