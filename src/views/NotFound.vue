<template>
  <van-empty description="空页面">
    <van-button round type="primary" class="bottom-button">返回主页（{{ current.seconds }}）</van-button>
  </van-empty>
</template>
<script setup lang="ts">
import { useCountDown } from '@vant/use'
import { useRouter } from 'vue-router'

const router = useRouter()
const countDown = useCountDown({
  // 倒计时 24 小时
  time: 2 * 1000,
  onFinish: () => {
    router.push({
      name: 'HomeIndex',
    })
  },
})
countDown.start()
const current = countDown.current

watchEffect(() => {
  console.log(current.seconds)
})
</script>

<style>
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>
