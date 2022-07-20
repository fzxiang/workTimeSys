import { createApp } from 'vue'
import '@/style.less'
import App from '@/App.vue'

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { router } from '@/router.ts'

const app = createApp(App)
app.use(router)
app.mount('#app')
