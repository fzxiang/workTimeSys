<template>
  <div>
    <van-calendar
      title="工时日历"
      ref="calendarRef"
      :show-title="false"
      :poppable="false"
      :show-confirm="false"
      :show-mark="false"
      :safe-area-inset-bottom="false"
      :class="calendarClass"
      :min-date="minData"
      :max-date="new Date()"
      :formatter="formatter"
      @select="onSelect"
      @month-show="onMonthShow"
    >
      <template #bottom-info="scoped">
        <span class="van-badge van-badge--dot" :class="handleFillStatus(scoped)"></span>
      </template>
    </van-calendar>
    <van-button class="link-btn" plain type="primary" @click="handleStats">工时统计</van-button>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { CalendarDayItem } from 'vant'
import { useCacheStore } from '/@/store/modules/cache'
import { useAppStore } from '/@/store/modules/app'
import { useRouter } from 'vue-router'
import { getMonthWorkingHours } from '/@/api/home'

const appStore = useAppStore()
const cacheStore = useCacheStore()
const router = useRouter()

appStore.setSelectData(new Date())
const calendarRef = ref()
const today = dayjs()
const minData = new Date(today.year(), today.month() - 5)
console.log(minData)
const calendarClass = ref('calendarClose')

const onMonthShow = async (obj) => {
  const today = dayjs(obj.date)
  const monthData = await getMonthWorkingHours({
    year: today.year(),
    month: today.month() + 1,
  })
  await cacheStore.setMonthData(today.format('YYYY-MM'), monthData)
}

// fix: 初始日历没有 偏移
nextTick(() => {
  calendarRef.value.scrollToDate(appStore.selectDate)
})

onMounted(() => {
  watchEffect(() => {
    if (appStore.calendar === 'close') {
      calendarClass.value = 'calendarClose'
      // fix: 上拉缩起日历 css height transition timer is 300ms
      const timer = setTimeout(() => {
        clearTimeout(timer)
        calendarRef.value.scrollToDate(appStore.selectDate)
      }, 300)
    } else {
      calendarClass.value = 'calendarOpen'
    }
  })
})

function formatter(day: any) {
  const { date } = day
  if (date.getDay() === 0 || date.getDay() === 6) {
    day.className = 'gray-color'
    day.bottomInfo = ''
  }
  if (dayjs(date).isSame(today, 'day')) {
    day.text = '今天'
  }
  return day
}

// 日期选择
function onSelect(value: Date) {
  appStore.setSelectData(value)
}

function handleFillStatus(scoped: CalendarDayItem) {
  const { date } = scoped
  const day = dayjs(date)
  const month = day.format('YYYY-MM')
  const monthData = cacheStore.getMonthData[month]

  const $D = day.date()
  let res = ''
  // 未来日期不标记📌
  if (day.isAfter(today, 'day')) {
    res = 'van-badge-status-none'
  }
  // 已填写
  else if (monthData && monthData[$D]) {
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
    // query: { date: store.selectDate },
  })
}
</script>

<style lang="less" scoped>
:deep(.van-calendar__day) {
  flex-direction: column;
}
:deep(.van-calendar__selected-day) {
  flex-direction: column;
  border-radius: 50%;
}
:deep(.van-calendar__bottom-info) {
  position: static;
  height: 6px;
}
//:deep(.van-calendar__body) {
//  transition: height ease 300ms;
//}
.calendarClose {
  height: 140px;
  :deep(.van-calendar__body) {
    overflow: hidden;
  }
}
.calendarOpen {
  height: 300px;
}
.van-calendar {
  transition: height ease-in-out 300ms;
}

.link-btn {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-weight: normal;
}
</style>
