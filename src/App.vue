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
import { useAppStore } from '/@/store/modules/app'

const wrapperStyle = {
  height: window.innerHeight + 'px',
}
const themeVars = {
  badgeDotSize: '5px',
  CalendarSelectedDaySize: '44px',
  CalendarDayHeight: '48px',
}

const appStore = useAppStore()
const theme = ref<ConfigProviderTheme>('light')
const mode = computed(() => appStore.mode)

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

onMounted(() => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    appStore.mode = 'dark'
    // dark mode
  } else {
    appStore.mode = 'light'
  }
})
</script>

<style lang="less">
.wrapper {
  text-align: center;
  overflow: auto;
}
@media screen and (min-width: 820px) {
  // 适配
  body {
    width: 820px;
    position: relative;
    margin-left: 50%;
    transform: translateX(-410px);
    display: inline-block;
    .van-submit-bar,
    .van-popup {
      width: 820px;
    }
  }
}
</style>
