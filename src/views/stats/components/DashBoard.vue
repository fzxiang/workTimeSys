<template>
  <div class="card" ref="cardRef">
    <h1>填写统计·天</h1>
    <apex-charts type="donut" :options="chartOptions" :series="series" style="text-align: left" />
    <van-grid :column-num="3" :border="false">
      <van-grid-item>
        <template #default>
          <div class="van-grid-num">{{ normal }}</div>
          <div class="van-grid-detail">正常填写</div>
        </template>
      </van-grid-item>
      <van-grid-item>
        <template #default>
          <div class="van-grid-num" :class="unfill > 0 ? 'warning' : ''">{{ unfill }}</div>
          <div class="van-grid-detail">未填异常</div>
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
import ApexCharts from 'vue3-apexcharts'
import { useRect } from '@vant/use';

const normal = ref(0)
const unfill = ref(0)
const fillError = ref(0)
const props = defineProps(['statusData', 'workingData'])
enum Status {
  success = 0,
  error = 1,
  other = 2,
}

interface Working {
  id?: number
  name?: string
  project_id: number
  project_name: string
  w_date: string
  status?: number
  w_value: number | string
}

const series = ref()

watchEffect(() => {
  const status = toRaw(props.statusData)
  normal.value = 0
  unfill.value = 0
  fillError.value = 0
  const working = toRaw(props.workingData)
  if (status) {
    const statusData = Object.values(status) as Working[]
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
  }
  series.value = [normal.value, unfill.value, fillError.value]
})

const cssStyle = getComputedStyle(document.querySelector('body'))

// 图形
const chartOptions = reactive({
  chart: {
    type: 'donut',
  },
  colors: [
    cssStyle.getPropertyValue('--van-primary-color'),
    cssStyle.getPropertyValue('--van-warning-color'),
    cssStyle.getPropertyValue('--van-danger-color'),
  ],
  labels: ['正常填写', '未填异常', '已填异常'],
  dataLabels: {
    enabled: true,
    formatter: function (val, { seriesIndex }) {
      return series.value[seriesIndex]
    },
    dropShadow: {
      enabled: false,
    },
  },
  plotOptions: {
    pie: {
      customScale: 1,
      startAngle: -90,
      endAngle: 90,
      offsetY: 10,
    },
  },
  grid: {
    padding: {
      bottom: -80,
    },
  },
  responsive: [
    {
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
})

// 图形适配宽屏
const cardRef = ref()
onMounted(() => {
  const rect = useRect(cardRef)
  chartOptions.grid.padding.bottom = -parseInt(rect.width / 4 + '')
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
