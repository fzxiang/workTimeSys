<template>
  <!--  <main class="main">-->
  <!--    <van-switch v-model="checked" size="18px" />-->
  <!--  </main>-->
</template>

<script setup lang="ts">
import { useStore } from '/@/stores'
import { localStore } from '/@/utils/local-storage'

const store = useStore()
const themeStore = localStore.get('theme')
const checked = ref<boolean>(themeStore === 'dark' ? true : false)

watch(checked, (val) => {
  if (val) {
    store.mode = 'dark'
    localStore.set('theme', 'dark', false)
  } else {
    store.mode = 'light'
    localStore.set('theme', 'light', false)
  }
})
</script>
