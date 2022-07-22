import { createApp } from 'vue'
import App from '/@/App.vue'
import { router } from '/@/router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '/@/style.less'

// Vant 桌面端适配
import '@vant/touch-emulator'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(router).use(pinia)
app.mount('#app')
