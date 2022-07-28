<template>
  <vue-horizontal-calendar @change="handleChange" />
  <van-pull-refresh v-show="!isNoData" v-model="isLoading" @refresh="onRefresh" style="margin-top: 92px">
    <div style="padding: 10px 15px">
      <van-steps direction="vertical" :active="active">
        <van-step v-for="item in allData" :key="item.day">
          <div class="flex-wrap" style="margin-bottom: 10px">
            <p>{{ item.day }}</p>
            <p>{{ item.week }}</p>
          </div>
          <div class="flex-wrap" v-for="childItem in item.data" :key="childItem.w_date">
            <h4 style="margin-bottom: 5px">
              {{ childItem.project_name }}
            </h4>
            <div>
              <van-tag plain :type="getStatusClass(childItem.status)">
                {{ parseInt(childItem.w_value * 100 + '') }}%
              </van-tag>
            </div>
          </div>
        </van-step>
      </van-steps>
    </div>
  </van-pull-refresh>
  <van-empty v-show="isNoData" description="暂无数据" />
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import VueHorizontalCalendar from '/@/views/stats/components/HorizontalCalendar.vue'
import { getMonthWorkingHours } from '/@/api/home'
import { useCacheStore } from '/@/store/modules/cache'
import { useAppStore } from '/@/store/modules/app'

// const cacheStore = useCacheStore()
// const appStore = useAppStore()
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
const getStatusClass = (status) => {
  return status === 0 ? 'primary' : 'danger'
}
onMounted(() => {
  initData(new Date())
})

async function initData(date) {
  isLoading.value = true

  const today = dayjs(new Date())
  const curDay = dayjs(date)
  if (today.month() === curDay.month()) {
    active.value = today.date() - 1
  } else if (today.isAfter(curDay)) {
    active.value = curDay.date() - 1
  } else {
    active.value = 0
  }
  const monthData = await getMonthWorkingHours({
    year: curDay.year(),
    month: curDay.month() + 1,
  })
  for (let i = 0; i < curDay.daysInMonth(); i++) {
    const day = `${curDay.$y}-${curDay.$M + 1}-${i + 1}`
    const week = MAP_WEEK[dayjs(day).day()]
    if (monthData[i + 1]) {
      allData.value[i] = {
        day,
        data: [...monthData[i + 1]],
        week,
      }
    } else {
      allData.value[i] = {
        day,
        data: [],
        week,
      }
    }
  }

  isLoading.value = false
}
</script>

<style lang="less" scoped>
.van-steps {
  text-align: left;
  h4,
  p {
    margin: 0;
  }
  .flex-wrap {
    display: flex;
    justify-content: space-between;
  }
  .primary {
    //color: var(--van-tag-primary-color);
  }
  .danger {
    color: var(--van-tag-danger-color);
  }
}
</style>
