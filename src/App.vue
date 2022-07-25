<template>
  <van-config-provider :theme-vars="themeVars" class="wrapper" :theme="theme" :style="wrapperStyle">
    <div class="wrapper-item">
      <Suspense>
        <router-view />
      </Suspense>
    </div>
  </van-config-provider>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import type { ConfigProviderTheme } from 'vant'
import { localStore } from '/@/utils/local-storage'
import { useStore } from '/@/stores'

const wrapperStyle = {
  height: window.innerHeight + 'px',
}
const themeVars = {
  badgeDotSize: '5px',
  CalendarSelectedDaySize: '44px',
  CalendarDayHeight: '50px',

}

const store = useStore()
const theme = ref<ConfigProviderTheme>('light')
const mode = computed(() => store.mode)

watch(
  mode,
  (val) => {
    if (val === 'dark' || localStore.get('theme') === 'dark') {
      theme.value = 'dark'
      document.querySelector('html').setAttribute('data-theme', 'dark')
    } else {
      theme.value = 'light'
      document.querySelector('html').setAttribute('data-theme', 'light')
    }
  },
  { immediate: true },
)
</script>

<style lang="less" scoped>
.wrapper {
  //display: flex;
  //justify-content: center;
  //height: 100%;
  text-align: center;
  overflow: auto;
  .wrapper-item {
    //flex: 1;
  }
}
@media screen and (min-width: 640px) {
  .wrapper-item {
    //flex: none;
    display: inline-block;
    width: 800px;
  }
}
</style>
