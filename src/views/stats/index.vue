<template>
  <van-sticky>
    <div class="header">
      <vue-horizontal-calendar @change="handleChange" />
    </div>
  </van-sticky>
  <van-pull-refresh v-show="!isNoData" v-model="isLoading" @refresh="onRefresh">
    <dash-board :statusData="statusData" :workingData="workingData" />
    <column-chart :statusData="statusData" :workingData="workingData" />
    <content-list :active="active" :all-data="allData" />
  </van-pull-refresh>

  <van-empty v-show="isNoData" description="暂无数据" />
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import VueHorizontalCalendar from '/@/views/stats/components/HorizontalCalendar.vue'
import DashBoard from '/@/views/stats/components/DashBoard.vue'

import { getMonthWorkingHours } from '/@/api/home'
import { useSound } from '@vueuse/sound'
import popUpOn from '/@/assets/sound/pop.wav'
import ColumnChart from '/@/views/stats/components/ColumnChart.vue'
import ContentList from '/@/views/stats/components/ContentList.vue'

// 声效
const onSound = useSound(popUpOn, { volume: 0.25 })

const isNoData = ref(false)
// 头部日历
const isLoading = ref(false)
const currentDate = ref(new Date())
async function onRefresh() {
  await initData(currentDate.value)
}
const handleChange = (value) => {
  currentDate.value = value
  if (dayjs(value).isAfter(new Date())) {
    isNoData.value = true
  } else {
    isNoData.value = false
    initData(value)
  }
}

const active = ref(0)
const MAP_WEEK = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const allData = ref([])

onMounted(() => {
  initData(new Date())
})

const statusData = ref()
const workingData = ref()
async function initData(date) {
  isLoading.value = true

  const today = dayjs(new Date())
  const curDay = dayjs(date)
  if (today.month() === curDay.month()) {
    active.value = today.date() - 1
  } else if (curDay.isBefore(today)) {
    active.value = curDay.daysInMonth() - 1
  } else {
    active.value = 0
  }
  const { status, working } = await getMonthWorkingHours({
    year: curDay.year(),
    month: curDay.month() + 1,
  })
  statusData.value = status
  workingData.value = working
  for (let i = 0; i < curDay.daysInMonth(); i++) {
    const day = `${curDay.year()}-${curDay.month() + 1}-${i + 1}`
    const week = MAP_WEEK[dayjs(day).day()]
    if (working[i + 1]) {
      allData.value[i] = {
        day,
        data: working[i + 1],
        status: status[i + 1]?.status,
        week,
      }
    } else {
      allData.value[i] = {
        day,
        data: [],
        status: status[i + 1]?.status,
        week,
      }
    }
  }

  onSound.play()

  isLoading.value = false
}
</script>

<style lang="less" scoped>
.header {
  background: var(--van-blue);
  padding: 15px 0;
  //position: fixed;
  //top: 0;
  //left: 0;
  //right: 0;
  //z-index: 9;
}
@media (prefers-color-scheme: dark) {
  .header {
    background: var(--van-background);
  }
}

</style>
