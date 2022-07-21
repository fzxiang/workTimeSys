import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { getMonthWorkingHours } from '/@/api/home'

const today = dayjs()
const monthData = await getMonthWorkingHours({
  year: today.year(),
  month: today.month() + 1,
})
export const useStore = defineStore({
  id: 'index',
  state: () => ({
    // light || dark
    mode: '',
    selectDate: '',
    workingVersionExpire: false,
    projectVersionExpire: false,
    monthData: monthData,
  }),
  getters: {
    getMonthData() {
      return this.monthData
    },
  },
  actions: {
    setMonthData(key: number, value: any): void {
      this.monthData[key] = value
    },
  },
})
