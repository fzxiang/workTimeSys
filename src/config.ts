import { init, initUrlMap, onBury } from '@xmon/bury'
import { localStore } from '/@/utils/local-storage'

// 用initUrlMap配置你想要监听的1页面路径和2加载页面，3离开页面的事件ID
initUrlMap([
  {
    path: '/',
    leave: 'eventIdLeavePage', // Leave EventId
    enter: 'eventIdEnterPage', // Enter EventId
  },
])

// 这里填写埋点事件返回值中的额外字段，通常你需要添加以下几个配置信息
const config = {
  user: JSON.stringify(localStore.get('userStore')),
}

init(config)

onBury((value) => {
  // 下文中 BuryConfig 中会说明 payload 中包含哪些值
  const buryInfo = value.payload
  // 下面是我的埋点回调示例行为，你应当用你的行为代替示例
  const queries = Object.entries(buryInfo)
    .map(([key, value]) => {
      return key + '=' + encodeURI(value)
    })
    .join('&')
  const img = new Image(1, 1)
  // 请将url改成你的后端埋点系统的API
  img.src = `http://10.130.0.57:9999/s.gif?` + queries
  // 3000ms超时处理
  setTimeout(() => {
    if (img && (!img.complete || !img.naturalWidth)) {
      img.src = ''
    }
  }, 3000)
})

export default config
