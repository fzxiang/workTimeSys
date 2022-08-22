import { createApp } from 'vue'
import App from '/@/App.vue'
import { router } from '/@/router'
import { setupStore } from '/@/store'
import '/@/style.less'

// Vant 桌面端适配
import '@vant/touch-emulator'

import 'vant/es/dialog/style'
import 'vant/es/toast/style'

const app = createApp(App)
setupStore(app)
app.use(router)
app.mount('#app')
