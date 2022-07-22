<template>
  <van-calendar
    title="工时日历"
    ref="calendarRef"
    :show-title="false"
    :poppable="false"
    :show-confirm="false"
    :show-mark="false"
    :safe-area-inset-bottom="false"
    @month-show="onMonthShow"
    :style="{ height: '130px' }"
    :min-date="minData"
    color="#1e80ff"
    :formatter="formatter"
    @select="onSelect"
  >
    <template #bottom-info="scoped">
      <span class="van-badge van-badge--dot" :class="handleFillStatus(scoped)"></span>
    </template>
    <template #subtitle>
      <van-row>
        <van-col span="6" />
        <van-col span="12"> {{ title }} </van-col>
        <van-col span="6" style="font-size: 0; text-align: right">
          <van-button class="link-btn" plain type="primary" @click="handleStats">工时统计</van-button>
        </van-col>
      </van-row>
    </template>
  </van-calendar>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { CalendarDayItem } from 'vant'
import { useStore } from '/@/stores'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const monthData = store.getMonthData
const calendarRef = ref()
const today = dayjs()
store.selectDate = today.format('YYYY-MM-DD')
const minData = new Date(2022, 0)

function formatter(day: any) {
  const month = day.date.getMonth() + 1
  // const date = day.date.getDate();
  const { date } = day
  if (date.getDay() === 0 || date.getDay() === 6) {
    day.className = 'gray-color'
    day.bottomInfo = ''
  }
  if (dayjs(date).isSame(today, 'day')) {
    day.text = '今天'
  }

  // if (month === 5) {
  //   if (date === 1) {
  //     day.topInfo = '劳动节';
  //   } else if (date === 4) {
  //     day.topInfo = '青年节';
  //   } else if (date === 11) {
  //     day.text = '今天';
  //     day.className = 'name'
  //   }
  // }

  // if (day.type === 'start') {
  //   day.bottomInfo = '入住';
  // } else if (day.type === 'end') {
  //   day.bottomInfo = '离店';
  // }

  return day
}

// 标题展示
const title = ref()
function onMonthShow(obj: { date: Date; title: string }) {
  title.value = obj.title
}

// 日期选择
function onSelect(value: Date | Date[]) {
  store.selectDate = dayjs(value).format('YYYY-MM-DD')
}
function handleFillStatus(scoped: CalendarDayItem) {
  const { date } = scoped
  const day = dayjs(date)
  const { $D } = day
  let res = ''
  // 未来日期不标记📌
  if (day.isAfter(today, 'day')) {
    res = 'van-badge-status-none'
  }
  // 已填写
  else if (monthData[$D]) {
    const { status } = monthData[$D][0]
    if (status === 0) {
      res = 'van-badge-status-ok'
    }
  }
  // 未填写
  else {
    res = 'van-badge-status-no'
  }
  return res
}

function handleStats() {
  router.push({
    path: '/stats',
    query: { date: store.selectDate },
  })
}
</script>

<style lang="less" scoped>
:deep(.van-calendar__selected-day) {
  border-radius: 50%;
}
:deep(.van-calendar__bottom-info) {
  bottom: 12px;
}
:deep(.van-calendar__body) {
  overflow: hidden;
}
.link-btn {
  border: none;
  font-weight: normal;
}
</style>
