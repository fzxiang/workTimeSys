<template>
  <div class="card">
    <h1>填写统计·天</h1>
    <van-grid :column-num="3" :border="false">
      <van-grid-item>
        <template #default>
          <div class="van-grid-num">{{ normal }}</div>
          <div class="van-grid-detail">正常</div>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template #default>
          <div class="van-grid-num" :class="unfill > 0 ? 'warning' : ''">{{ unfill }}</div>
          <div class="van-grid-detail">未填</div>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template #default>
          <div class="van-grid-num" :class="fillError > 0 ? 'error' : ''">{{ fillError }}</div>
          <div class="van-grid-detail">已填异常</div>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useCacheStore } from '/@/store/modules/cache'
import { useTitle } from '@vueuse/core'

import { getMonthWorkingHours } from '/@/api/home'

// title
const siteTitle = useTitle()
const today = dayjs(new Date())
const year = ref(today.year())
siteTitle.value = '统计 · ' + year.value

const normal = ref(0)
const unfill = ref(0)
const fillError = ref(0)
const props = defineProps(['statusData', 'workingData'])
enum Status {
  success = 0,
  error = 1,
  other = 2,
}
watchEffect(() => {
  const status = toRaw(props.statusData)
  normal.value = 0
  unfill.value = 0
  fillError.value = 0
  const working = toRaw(props.workingData)
  if (status) {
    const statusData = Object.values(status)
    statusData.forEach((item) => {
      if (item.status === Status.success) {
        normal.value++
      } else if (item.status === Status.error) {
        const date = dayjs(item.w_date).date()
        if (working[date]) {
          fillError.value++
        } else {
          unfill.value++
        }
      }
    })
    normal.value = statusData.filter((item) => item.status === Status.success).length
    const errorArr = statusData.filter((item) => item.status === Status.error)
    // errorArr.
    console.log(errorArr, working)
  }
})
</script>

<style lang="less" scoped>
.card {
  background-color: var(--van-background-2);
  margin: var(--van-padding-xs);
  padding: var(--van-padding-xs);
  border-radius: var(--van-padding-base);
  h1 {
    font-size: var(--van-font-size-md);
    padding: 0 var(--van-padding-xs);
    text-align: left;
  }
  .van-grid {
    .van-grid-num {
      font-size: calc(var(--van-font-size-sm) * 2);
      color: var(--van-primary-color);
      font-weight: var(--van-font-bold);
    }
    .van-grid-detail {
      margin-top: var(--van-padding-base);
      font-size: var(--van-font-size-sm);
      color: var(--van-gray-6);
    }
    .warning {
      color: var(--van-warning-color);
    }
    .error {
      color: var(--van-danger-color);
    }
  }
}
</style>
