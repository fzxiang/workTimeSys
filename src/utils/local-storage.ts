import store from 'store'
import expirePlugin from 'store/plugins/expire'

// plugin usage:
store.addPlugin(expirePlugin)

const expireTime = new Date().getTime() + 60 * 60 * 24 * 1000

export const localStore = {
  set: (key, value, expire) => {
    if (expire) {
      // @ts-ignore
      return store.set(key, value, expireTime)
    } else {
      return store.set(key, value)
    }
  },
  get: (key) => {
    return store.get(key)
  },
}
