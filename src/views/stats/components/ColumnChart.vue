<template>
  <div class="card">
    <h1>项目统计·天</h1>
    <apex-charts type="bar" :options="chartOptions" :series="series" />
  </div>
</template>

<script setup lang="ts">
import ApexCharts from 'vue3-apexcharts'
import get from 'lodash.get'
import { useAppStore } from '/@/store/modules/app'

const appStore = useAppStore()
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

const cssStyle = getComputedStyle(document.querySelector('body'))

// 图形
const colors = [
  cssStyle.getPropertyValue('--van-primary-color'),
  cssStyle.getPropertyValue('--van-warning-color'),
  cssStyle.getPropertyValue('--van-danger-color'),
]
const series = reactive([
  {
    name: '工时天数',
    data: [],
  },
])
const chartOptions = reactive({
  theme: { mode: appStore.mode },
  chart: {
    type: 'bar',
    toolbar: {
      show: false,
    },
  },
  // colors,
  plotOptions: {
    bar: {
      columnWidth: '45%',
      distributed: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  xaxis: {
    categories: [],
    labels: {
      style: {
        // colors,
        fontSize: '12px',
      },
    },
  },
})

watchEffect(() => {
  // const status = toRaw(props.statusData)
  const working = toRaw(props.workingData)
  if (working) {
    const workingMap = {}
    const workingArr = Object.values(working).flat() as Working[]
    workingArr.forEach((item) => {
      if (!workingMap[item.project_id]) workingMap[item.project_id] = []
      workingMap[item.project_id].push(item)
    })
    // 初始
    series[0].data.splice(0)
    chartOptions.xaxis.categories.splice(0)
    Object.values(workingMap).forEach((item: Working[]) => {
      let len = 0
      item.forEach((obj) => {
        if (obj.w_value > 0) len++
      })
      series[0].data.push(len)
      chartOptions.xaxis.categories.push(get(item, [0, 'project_name']))
    })
  }
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
