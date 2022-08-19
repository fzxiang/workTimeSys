<template>
  <div>
    <h4 v-if="appStore.userAgent === 'desktop'">{{ year }} 年</h4>
    <van-swipe :show-indicators="false" :loop="false">
      <van-swipe-item>
        <van-button
          v-for="item in date"
          type="primary"
          size="small"
          round
          :key="item.key"
          @click="handleClick(item)"
          :plain="handleBtnStatus(item)"
        >
          {{ item.month + 1 }} 月
        </van-button>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useAppStore } from '/@/store/modules/app'
import { useTitle } from '@vueuse/core'

const appStore = useAppStore()

const siteTitle = useTitle()
const today = dayjs(new Date())
const year = ref(today.year())
siteTitle.value = '统计 · ' + year.value
const currentMon = ref(today.format('YYYY-MM'))
const date = []

// 展示只有六个月数据
for (let i = 0; i < 6; i++) {
  const before = today.subtract(i, 'month')
  date.unshift({
    key: before.format('YYYY-MM'),
    year: before.year(),
    month: before.month(),
  })
}

// as interface
interface Emits {
  (e: 'change', newValue: string): void
}
const emits = defineEmits<Emits>()
function handleClick(date) {
  currentMon.value = date.key
  year.value = date.year
  emits('change', date.key)
}

function handleBtnStatus(item) {
  if (appStore.mode === 'dark') {
    return currentMon.value !== item.key
  } else {
    return currentMon.value === item.key
  }
}
</script>

<style lang="less" scoped>
h4 {
  color: var(--van-button-primary-color);
  margin: 10px auto;
}
.van-swipe-item {
  display: flex;
  justify-content: space-evenly;
  .van-button {
    width: 40px;
    height: 40px;
    padding: 0;
  }
}

.van-button--plain {
  animation-duration: 0.5s;
  animation-name: bounceIn;
}
</style>
