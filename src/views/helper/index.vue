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
    <p class="content">1、选择当前日期（下拉工时面板可展开日期）</p>
    <p class="content">2、点击下方新增项目</p>
    <p class="content">3、编辑工时，当天总工时必须等于100%或者0%</p>
    <p class="content">
      4、点击提交<span class="warning">（节假日情况下有提示弹窗 - 点击确认）</span>
    </p>
    <p class="content notice">注：操作提交后，会记录上一次提交摸版</p>
    <div class="van-video-box">
      <video-player
        class="video-player vjs-big-play-centered"
        src="258c3ea.mov"
        crossorigin="anonymous"
        playsinline
        controls
        :volume="0.6"
        :playback-rates="[0.7, 1.0, 1.5, 2.0]"
      />
    </div>
  </div>

  <div class="card">
    <h1>3、如何修改工时？</h1>
    <p class="content">点击下方修改，进入编辑状态 - 修改完成点击提交</p>
    <div class="van-video-box">
      <video-player
        class="video-player vjs-big-play-centered"
        src="3b7aefca.mov"
        crossorigin="anonymous"
        playsinline
        controls
        :volume="0.6"
        :playback-rates="[0.7, 1.0, 1.5, 2.0]"
      />
    </div>
  </div>

  <div class="card">
    <h1>4、如何重置（撤销）工时？</h1>
    <p class="content">选择已填日期 - 点击下方重置按钮 - 确定</p>
    <div class="van-video-box">
      <video-player
        class="video-player vjs-big-play-centered"
        src="413bc5.mov"
        crossorigin="anonymous"
        playsinline
        controls
        :volume="0.6"
        :playback-rates="[0.7, 1.0, 1.5, 2.0]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { VideoJsPlayer } from 'video.js'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
</script>

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
  .van-video-box {
    background-color: var(--van-background);
    border-radius: var(--van-radio-size);
    overflow: hidden;
    .video-player {
      width: 100%;
      height: 200px;
    }
  }
  .warning {
    color: var(--van-warning-color);
  }
  .notice {
    color: var(--van-gray-5)
  }
}
</style>
