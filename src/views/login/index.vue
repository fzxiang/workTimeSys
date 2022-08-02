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
  </div>
</template>

<script setup lang="ts">
const { VITE_APP_API_BASE_URL } = import.meta.env
onBeforeMount(() => {
  location.href = location.origin + VITE_APP_API_BASE_URL + '/ssoLogin'
})

function handleSSOLogin() {
  location.href = location.origin + VITE_APP_API_BASE_URL + '/ssoLogin'
}
</script>

<style lang="less" scoped>
@media (max-width: 780px) {
  .vben-login {
    position: absolute;
    top: 40%;
    left: 0;
    margin-top: -50%;
  }
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
