<template>
  <div class="vben-login">
    <van-row justify="center">
      <van-col span="16">
        <h1>泡游工时系统</h1>
      </van-col>
      <van-col span="16" style='margin-top: 40px'>
        <img style="width: 100%" src="./login-box-bg.svg" class="logo" alt="logo" />
      </van-col>
      <van-col span="16" style="margin-top: 40px">
        <van-button type="primary" block @click="handleSSOLogin"> SSO登录 </van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script setup lang="ts">
function handleSSOLogin() {
  location.href = location.origin + '/ssoLogin'
}
</script>

<style lang="less" scoped>
@media (max-width: 1200px) {
  .vben-login {
    //background-color: #293146;
  }
}
.vben-login {
  display: flex;
  align-items: center;
  min-height: 100%;
  overflow: hidden;
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
