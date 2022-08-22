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
      <template #top-info="scoped">
        <van-badge dot :color="handleStatusColor(scoped)" />
      </template>
      <!--      <template #bottom-info="scoped">-->
      <!--        <span>工作日</span>-->
      <!--      </template>-->
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
import get from 'lodash.get'

const appStore = useAppStore()
const cacheStore = useCacheStore()
const router = useRouter()

const calendarRef = ref()
const today = dayjs()
const minData = new Date(today.year(), today.month() - 5)
console.log(minData)
const calendarClass = ref('calendarClose')

const onMonthShow = async (obj) => {
  const currentDate = dayjs(obj.date)
  const monthData = await getMonthWorkingHours({
    year: currentDate.year(),
    month: currentDate.month() + 1,
  })
  await cacheStore.setMonthData(currentDate.format('YYYY-MM'), monthData)
  // fix: 初始页面 获取月报数据后 触发selectDate
  if (today.format('YYYY-MM') === currentDate.format('YYYY-MM')) {
    appStore.setSelectData(new Date())
  }
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

const cssStyle = getComputedStyle(document.querySelector('body'))
function handleStatusColor(scoped: CalendarDayItem) {
  const { date } = scoped
  const day = dayjs(date)
  const month = day.format('YYYY-MM')
  const monthData = get(cacheStore.getMonthData, [month, 'status'])
  const $D = day.date()
  // 未来日期不标记📌
  if (day.isAfter(today, 'day')) {
    return 'transparent'
  }
  // 已填写
  if (monthData && monthData[$D]) {
    const { status } = monthData[$D]
    if (status === 0) {
      return cssStyle.getPropertyValue('--van-success-color')
    } else if (status === 1) {
      return cssStyle.getPropertyValue('--van-error-color')
    } else if (status === 2) {
      return cssStyle.getPropertyValue('--van-text-color-3')
    }
  } else {
    return cssStyle.getPropertyValue('--van-text-color-3')
  }
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

:deep(.van-calendar__top-info) {
  position: static;
  height: 4px;
  line-height: 4px;
  margin-bottom: 4px;
}
:deep(.van-calendar__bottom-info) {
  position: static;
  margin-top: 4px;
  height: 12px;
  line-height: 12px;
}

//:deep(.van-calendar__body) {
//  transition: height ease 300ms;
//}
.calendarClose {
  height: 130px;
  :deep(.van-calendar__body) {
    overflow: hidden;
  }
}
.calendarOpen {
  height: 330px;
}
.van-calendar {
  transition: height ease-in-out 300ms;
  .van-badge {
    transform: translate(0, 0);
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
