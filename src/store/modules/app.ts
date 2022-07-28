import { defineStore } from 'pinia'
import { store } from '/@/store'
import dayjs from 'dayjs'
import { useWindowSize } from '@vant/use'
interface AppState {
  // 模式暗黑和白色
  mode?: 'dark' | 'light'
  // 当前选择日期
  selectDate: Date
  // 日历折叠状态
  calendar: 'close' | 'open'
  // Page loading status
  pageLoading?: boolean
}

const { width } = useWindowSize()

// 即时缓存
export const useAppStore = defineStore(`__app__`, {
  state: (): AppState => ({
    // light || dark
    mode: undefined,
    selectDate: new Date(),
    userAgent: width.value < 820 ? 'mobile' : 'desktop',
    calendar: width.value < 820 ? 'close' : 'open',
  }),
  getters: {
    showFormData() {
      const today = dayjs(new Date())
      const curDay = dayjs(this.selectDate)
      return today.isAfter(curDay)
    },
  },
  actions: {
    setCalendar(value: string) {
      this.calendar = value
    },
    setSelectData(value: Date) {
      this.selectDate = value
    },
  },
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
