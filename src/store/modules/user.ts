import { defineStore } from 'pinia'
import { store } from '/@/store'

interface UserState {
  token: any
  user_name: string
  user_name_en: string
}
export const useUserStore = defineStore(`__user__`, {
  state: (): UserState => ({
    // 用户token
    token: undefined,
    user_name: '',
    user_name_en: '',
  }),
  persist: true,
  getters: {},
  actions: {},
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
