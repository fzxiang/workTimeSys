<template>
  <Suspense>
    <van-config-provider :theme-vars="themeVars" class="wrapper" ref="scroll" :style="wrapperStyle">
      <div class="wrapper-item">
        <router-view />
      </div>
    </van-config-provider>
  </Suspense>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Home from '@/views/home/index.vue'

const wrapperStyle = {
  height: window.innerHeight + 'px',
}
const themeVars = {
  badgeDotSize: '5px',
  CalendarSelectedDaySize: '44px',
}

// import BScroll from '@better-scroll/core'
// import Pullup from '@better-scroll/pull-up'

// BScroll.use(Pullup)

// const scroll = ref()

// onMounted(() => {
//   const bscroll = new BScroll('.wrapper', {
//     pullUpLoad: true
//   })

//   bscroll.on('pullingUp', () => {
//     console.log('下拉')
//   })
// })
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  height: 100%;
  overflow: auto;
  .wrapper-item {
    flex: 1;
  }
}
@media screen and (min-width: 640px) {
  .wrapper-item {
    width: 800px;
  }
}
</style>
