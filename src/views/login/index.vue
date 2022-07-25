<template>
  <div class="vben-login">
    <van-row justify="center">
      <van-col span="16">
        <h1>泡游工时系统</h1>
      </van-col>
      <van-col span="16" style="margin-top: 40px">
        <img style="width: 100%" src="./login-box-bg.svg" class="logo" alt="logo" />
      </van-col>
      <van-col span="16" style="margin-top: 40px">
        <van-button type="primary" block @click="handleSSOLogin"> SSO登录 </van-button>
      </van-col>
    </van-row>
    <!--  <van-switch v-model="checked" size="18px" />-->
  </div>
</template>

<script setup lang="ts">
import { localStore } from '/@/utils/local-storage'
import { useStore } from '/@/stores'

const themeStore = localStore.get('theme')
const checked = ref<boolean>(themeStore === 'dark')
const store = useStore()

watch(checked, (val) => {
  if (val) {
    store.mode = 'dark'
    localStore.set('theme', 'dark', false)
  } else {
    store.mode = 'light'
    localStore.set('theme', 'light', false)
  }
})

const { VITE_APP_API_BASE_URL } = import.meta.env
function handleSSOLogin() {
  location.href = location.origin + VITE_APP_API_BASE_URL + '/ssoLogin'
}
</script>

<style lang="less" scoped>
@media (max-width: 1200px) {
  .vben-login {
    //background-color: #293146;
  }
}
.vben-login {
  position: absolute;
  top: 40%;
  left: 0;
  margin-top: -50%;
  //display: flex;
  //align-items: center;
  //min-height: 100%;
  //overflow: hidden;
  //background-color: #293146;
}
.van-row {
  //margin-top: 50%;
  //transform: translateY(-50%);
}
.van-col {
  margin-bottom: 20px;
  h1 {
    text-align: center;
  }
}
</style>
