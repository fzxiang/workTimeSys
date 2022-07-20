<template>
  <van-switch v-model="checked" size="18px" />
</template>

<script setup lang="ts">
import { useUrlSearchParams } from '@vueuse/core'

const params = useUrlSearchParams('history')
console.log(params)


import { useStore } from '/@/stores'
import { localStorage } from '/@/utils/local-storage'

const store = useStore()
const themeStore = localStorage.get('theme')
const checked = ref<boolean>(themeStore === 'dark' ? true: false)

watch(checked,(val) => {
  if(val) {
    store.mode = 'dark'
    localStorage.set('theme', 'dark')
  } else {
    store.mode = 'light'
    localStorage.set('theme', 'light')
  }
})
</script>
