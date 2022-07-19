
<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh" @change="onChange"  style="min-height: 100vh;" :disabled="true">
    <div ref="calendarRef">
      <van-calendar
        title="工时日历"
        :poppable="false"
        :show-confirm="false"
        :style="{ height: '500px' }"
        :min-date="minData"
        color="#1e80ff"
        :formatter="formatter"
      >
        <template #bottom-info="scoped">
          <span class="van-badge van-badge--dot" :class="handleFillStatus(scoped)"></span>
        </template>
      </van-calendar>
    </div>

    <WorkTimeForm />

  </van-pull-refresh>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import { Toast } from "vant";
import { useScrollParent, useEventListener } from '@vant/use';
import type {
  CalendarType,
  CalendarProps,
  CalendarDayItem,
  PullRefreshProps,
  PickerObjectOption,
  CalendarInstance,
} from 'vant';

import WorkTimeForm from "./components/WorkTimeForm.vue";

const today = dayjs()
const minData = new Date(2022, 0)

const calendarRef = ref()
// console.log(calendarRef)
// useEventListener(
//   'scroll',
//   () => {
//     console.log('scroll');
//   },
//   { target:  useScrollParent(calendarRef.value?.querySelector('.van-calendar__body')) }
// );

function formatter (day: any) {
  const month = day.date.getMonth() + 1;
  // const date = day.date.getDate();
  const { date } = day
  if (date.getDay() === 0 || date.getDay() === 6) {
    day.className = 'gray-color'
    day.bottomInfo = '';

  }
  if (dayjs(date).isSame(today, 'day')) {
    day.text = '今天';
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

  return day;
};

// 填写状态
function handleFillStatus(scoped: CalendarDayItem) {
  const { date } = scoped
  let res = ''
  if(dayjs(date).isAfter(today, 'day')) {
    res = 'van-badge-status-none'
  }
  // 已填写 
  else if(false){
  }
  // 未填写 
  else {

  } 
  return res
}

// 下拉刷新
const count = ref(0);
const loading = ref(false);
const onRefresh = () => {
  setTimeout(() => {
    Toast('刷新成功');
    loading.value = false;
    count.value++;
  }, 1000);
};
const onChange = (pullProps: PullRefreshProps) => {
  console.log(pullProps)
}


</script>
