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
      style="height: 300px"
      :class="calendarClass"
      :min-date="minData"
      color="#1e80ff"
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
const minData = new Date(2022, 0)
const calendarClass = ref('calendarClose')

const onMonthShow = async (obj) => {
  const today = dayjs(obj.date)
  const monthData = await getMonthWorkingHours({
    year: today.year(),
    month: today.month() + 1,
  })
  await cacheStore.setMonthData(today.format('YYYY-MM'), monthData)
}
onMounted(() => {
  nextTick(() => {
    calendarRef.value.scrollToDate(new Date())
  })

  watchEffect(() => {
    if (appStore.calendar === 'close') {
      calendarRef.value.scrollToDate(appStore.selectDate)
      calendarClass.value = 'calendarClose'
    } else {
      calendarClass.value = ''
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
:deep(.van-calendar__selected-day) {
  border-radius: 50%;
}
:deep(.van-calendar__bottom-info) {
  bottom: 4px;
}
:deep(.van-calendar__body) {
  //overflow: hidden;
}
.calendarClose {
  :deep(.van-calendar__body) {
    overflow: hidden;
  }
}

.link-btn {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-weight: normal;
}
</style>
