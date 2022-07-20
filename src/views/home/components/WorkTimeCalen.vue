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
  >
    <template #bottom-info="scoped">
      <span class="van-badge van-badge--dot" :class="handleFillStatus(scoped)"></span>
    </template>
    <template #subtitle>
      <van-row>
        <van-col span="6"></van-col>
        <van-col span="12"> {{ title }} </van-col>
        <van-col span="6" style="font-size: 0; text-align: right">
          <van-button class="link-btn" plain type="primary">工时统计</van-button>
        </van-col>
      </van-row>
    </template>
  </van-calendar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import { Toast } from 'vant'
import { useScrollParent, useEventListener } from '@vant/use'
import type { CalendarDayItem, PullRefreshProps } from 'vant'

const calendarRef = ref()
console.log(calendarRef)
const today = dayjs()
const minData = new Date(2022, 0)

// console.log(calendarRef)
// useEventListener(
//   'scroll',
//   () => {
//     console.log('scroll');
//   },
//   { target:  useScrollParent(calendarRef.value?.querySelector('.van-calendar__body')) }
// );

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
const title = ref()

function onMonthShow(obj: { date: Date; title: string }) {
  title.value = obj.title
}

// 填写状态
function handleFillStatus(scoped: CalendarDayItem) {
  const { date } = scoped
  let res = ''
  if (dayjs(date).isAfter(today, 'day')) {
    res = 'van-badge-status-none'
  }
  // 已填写
  else if (false) {
  }
  // 未填写
  else {
  }
  return res
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
