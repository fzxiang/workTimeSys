import type { App } from 'vue'
import { createPinia } from 'pinia'
import pluginPersistState from 'pinia-plugin-persistedstate'

const store = createPinia()

store.use(pluginPersistState)
export function setupStore(app: App<Element>) {
  app.use(store)
}

export { store }
