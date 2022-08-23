<template>
  <van-sticky>
    <div class="header">工时系统使用帮助</div>
  </van-sticky>
  <div class="card">
    <h1>项目说明</h1>
    <p class="content">正在建设中...</p>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.header {
  background: var(--van-primary-color);
  padding: 15px 0;
  color: var(--van-button-primary-color);
}
.card {
  background-color: var(--van-background-2);
  margin: var(--van-padding-xs);
  padding: var(--van-padding-xs);
  border-radius: var(--van-padding-base);
  text-align: left;
  h1 {
    font-size: var(--van-font-size-md);
    padding: 0 var(--van-padding-xs);
    text-align: left;
    color: var(--van-primary-color);
  }
  .content {
    text-indent: 2em;
  }
}
</style>
