// 有缓存的local storage
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
    const keyArr = key.split('.')
    let result = ''
    if (keyArr.length > 1) {
      const params = store.get(keyArr[0])
      if (params) {
        result = params[keyArr[1]]
      }
    } else {
      result = store.get(key)
    }
    return result
  },
  remove: (key) => {
    return store.remove(key)
  },
}
