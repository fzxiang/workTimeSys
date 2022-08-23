<template>
  <!--  <van-sticky>-->
  <!--    <div class="header">工时系统使用帮助</div>-->
  <!--  </van-sticky>-->
  <div class="card">
    <h1>项目说明（正在建设中...）</h1>
    <p class="content">
      <van-tag type="primary">泡游网络工时系统</van-tag> 方便于员工每日正确填写工时
    </p>
  </div>

  <div class="card">
    <h1>1、状态说明</h1>
    日历中有三种颜色标识：
    <p class="content">
      <van-badge dot />
      <span style="margin-left: 1em">红色为异常</span>
    </p>
    <p class="content">
      <van-badge class="van-badge-status-ok" dot />
      <span style="margin-left: 1em">绿色为正常</span>
    </p>
    <p class="content">
      <van-badge class="van-badge-status-no" dot />
      <span style="margin-left: 1em">灰色为未填写</span>
    </p>
  </div>

  <div class="card">
    <h1>2、如何填写工时？</h1>
    <p class="content">1、正在建设中...</p>
    <p class="content">2、正在建设中...</p>
    <p class="content">3、正在建设中...</p>
    <p class="content">4、正在建设中...</p>
  </div>

  <div class="card">
    <h1>3、如何修改工时？</h1>
    <p class="content">正在建设中...</p>
  </div>

  <div class="card">
    <h1>4、如何重置工时？</h1>
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
    font-size: var(--van-font-size-lg);
    padding: 0 var(--van-padding-xs);
    text-align: left;
    color: var(--van-primary-color);
  }
  .content {
    font-size: var(--van-font-size-md);
    text-indent: 1em;
    .van-tag {
      text-indent: 0;
    }
  }
}
</style>
