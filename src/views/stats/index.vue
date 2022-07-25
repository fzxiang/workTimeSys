<template>
  <div>
    <vue-horizontal-calendar @change="handleChange" />
  </div>
  <van-pull-refresh
    v-model="isLoading"
    style="min-height: 100vh;"
    @refresh="onRefresh"
  >
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
</template>

<script setup lang="ts">
import { useStore } from '/@/stores'
import dayjs from 'dayjs'
import VueHorizontalCalendar from '/@/views/stats/components/HorizontalCalendar.vue'
import { getMonthWorkingHours } from '/@/api/home'

const store = useStore()

// 头部日历
const pullRefreshStyle = {
  height: window.innerHeight - 74 + 'px',
}
const selectdMonth = ref()
const isLoading = ref(false)
async function onRefresh() {
  console.log('sdfd', selectdMonth.value)
  await initData()
}
const handleChange = (value) => {
  initData(value)
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

const monthData = ref([])
async function initData(date) {
  isLoading.value = true

  const today = dayjs(date)
  active.value = today.$D - 1
  const monthData = await getMonthWorkingHours({
    year: today.year(),
    month: today.month() + 1,
  })
  for (let i = 0; i < today.daysInMonth(); i++) {
    const day = `${today.$y}-${today.$M + 1}-${i + 1}`
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
