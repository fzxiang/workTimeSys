<template>
  <van-form @submit="onSubmit" input-align="right" :disabled="!isEdit">
    <div class="pulldown" :class="pullRefreshClass">
      <div ref="scroll" class="pulldown-wrapper">
        <div class="pulldown-content">
          <div class="pulldown-list">
            <van-notice-bar
              v-if="tips"
              left-icon="info-o"
              :color="tipsColor"
              :background="tipsBgColor"
            >
              {{ tips }}
            </van-notice-bar>
            <van-swipe-cell
              name="swipeCell"
              v-for="(item, index) in formData"
              :key="index"
              :stop-propagation="true"
              ref="swipeCellRef"
              :disabled="!isEdit"
            >
              <van-skeleton :row="3" :row-width="['60%', '100%', '60%']" round :loading="loading">
                <van-cell-group>
                  <van-field
                    size="large"
                    label-width="40px"
                    v-model="item.project_name"
                    is-link
                    :readonly="true"
                    name="project_id"
                    label="项目"
                    placeholder="点击选择项目"
                    @click="handleShowPicker(index)"
                    error-message-align="right"
                    :rules="[{ required: true, message: '请选择项目' }]"
                  />
                  <van-field name="slider" label="工时" size="large" :readonly="true">
                    <template #input>
                      <van-stepper
                        v-model="item.w_value"
                        min="0"
                        max="100"
                        step="5"
                        integer
                        button-size="22"
                        :show-plus="false"
                        :show-input="false"
                        @change="handleLogic"
                        :disabled="!isEdit"
                      />
                      <van-slider
                        v-model="item.w_value"
                        step="5"
                        style="margin: 0 30px"
                        @change="handleLogic"
                        :disabled="!isEdit"
                      >
                        <template #button>
                          <van-button type="primary" size="small" round style="width: 40px"
                            >{{ item.w_value }}%</van-button
                          >
                        </template>
                      </van-slider>
                      <van-stepper
                        v-model="item.w_value"
                        min="0"
                        max="100"
                        step="5"
                        integer
                        button-size="22"
                        :show-minus="false"
                        :show-input="false"
                        @change="handleLogic"
                        :disabled="!isEdit"
                      />
                    </template>
                  </van-field>
                </van-cell-group>
              </van-skeleton>

              <template #right>
                <van-button
                  square
                  type="danger"
                  text="删除"
                  class="delete-button"
                  @click="handleDelete(index)"
                />
              </template>
            </van-swipe-cell>
          </div>
        </div>
      </div>
    </div>

    <van-submit-bar class="box-shadow">
      <template #default>
        <p>
          总工时:
          <span :class="!checkTotal > 0 ? 'success' : 'danger'">{{ totalTime }}%</span>
        </p>
      </template>
      <template #button>
        <div v-show="!isEdit">
          <van-button round plain type="warning" size="normal" @click="handleReset">
            重置
          </van-button>
          <van-button round type="success" v-show="!isEdit" @click="isEdit = true">
            修改
          </van-button>
        </div>
        <div v-show="isEdit">
          <van-button
            v-if="appStore.userAgent === 'desktop'"
            round
            type="danger"
            plain
            @click="openDelete"
          >
            删除
          </van-button>
          <van-button round type="primary" plain @click="handleAdd"> 新增项目 </van-button>
          <van-button round type="primary" native-type="submit"> 提交 </van-button>
        </div>
      </template>
    </van-submit-bar>

    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker
        v-model="selectedValues"
        :columns="cacheStore.getProject"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </van-form>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { PickerConfirmEventParams } from 'vant'
import { showToast, showConfirmDialog } from 'vant'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import PullDown from '@better-scroll/pull-down'
import { saveWorkingHours } from '/@/api/home'
import dayjs from 'dayjs'
import { useCacheStore } from '/@/store/modules/cache'
import { useAppStore } from '/@/store/modules/app'
import get from 'lodash.get'
import { useWindowSize } from '@vant/use'
import { getHolidayStatus } from '/@/views/home/components/common'
const cacheStore = useCacheStore()
const appStore = useAppStore()

const { width } = useWindowSize()
/**
 * 下拉展开日历操作
 * **/
BScroll.use(MouseWheel)
BScroll.use(PullDown)
const baseClass = width.value < 820 ? 'box-shadow ' : ''
const pullRefreshClass = ref(baseClass + 'pull-refresh-open')
watchEffect(() => {
  if (appStore.calendar === 'close') {
    pullRefreshClass.value = baseClass + 'pull-refresh-close'
  } else {
    pullRefreshClass.value = baseClass + 'pull-refresh-open'
  }
  finishPull()
})

const scroll = ref()
const bscroll = ref()
const loading = ref(false)
onMounted(() => {
  bscroll.value = new BScroll(scroll.value, {
    scrollY: true,
    bounceTime: 800,
    mouseWheel: true,
    pullDownRefresh: {
      threshold: 40,
      stop: 0,
    },
  })
  bscroll.value.on('scrollStart', (e) => {
    // 向上滑动
    if (bscroll.value.movingDirectionY === 1) {
      appStore.setCalendar('close')
    }
  })
  bscroll.value.on('pullingDown', (e) => {
    appStore.setCalendar('open')
    bscroll.value.finishPullDown()
  })
})

function finishPull() {
  nextTick(() => {
    bscroll.value.refresh()
  })
}

/**
 * 表单
 * **/
interface FormData {
  project_id: number | string
  project_name: number | string
  w_value: number
}
const formData: Ref<FormData[]> = ref([])
const showPicker = ref(false)
const totalTime = ref(100)
// 编辑和提交状态
const isEdit = ref(false)
// 状态提示
const tips = ref()
const tipsColor = ref()
const tipsBgColor = ref()
const cssStyle = getComputedStyle(document.querySelector('body'))

watch(
  () => appStore.selectDate,
  (val, oldVal) => {
    loading.value = true
    const day = dayjs(val)
    const month = day.format('YYYY-MM')
    const $D = day.date()
    formData.value = [
      {
        project_id: 0,
        project_name: '',
        w_value: 0,
      },
    ]
    const monthStatus = get(cacheStore.getMonthData, [month, 'status'])
    // 状态赋值
    if (monthStatus && monthStatus[$D]) {
      const { status, reason } = monthStatus[$D]
      if (status === 1) {
        tips.value = reason
        tipsColor.value = cssStyle.getPropertyValue('--van-warn-color')
        tipsBgColor.value = ''
      } else if (status === 2) {
        tips.value = reason
        tipsColor.value = cssStyle.getPropertyValue('--van-text-color-2')
        tipsBgColor.value = cssStyle.getPropertyValue('--van-background')
      } else {
        tips.value = undefined
      }
    } else {
      tips.value = undefined
    }
    // 表单赋值
    const monthWorking = get(cacheStore.getMonthData, [month, 'working'])
    if (monthWorking && monthWorking[$D]) {
      formData.value = monthWorking[$D].map((item) => {
        return {
          ...item,
          w_value: parseInt(item.w_value * 100 + ''),
        }
      })
    } else {
      if (cacheStore.getWorking.length !== 0) {
        formData.value = cacheStore.getWorking.map((item) => {
          return {
            ...item,
            w_value: parseInt(item.w_value * 100 + ''),
          }
        })
      }
    }
    handleLogic()
    const timer = setTimeout(() => {
      loading.value = false
      clearTimeout(timer)
    }, 300)
  },
  // { immediate: false },
)

watchEffect(() => {
  const curDay = dayjs(appStore.selectDate)
  const today = dayjs()
  handleEditLogic(today, curDay)
})

const selectedIndex = ref(0)
const selectedValues = ref<[number]>([0])
const onConfirm = (obj: PickerConfirmEventParams) => {
  const { selectedOptions } = obj
  formData.value[selectedIndex.value].project_id = selectedOptions[0]?.value
  formData.value[selectedIndex.value].project_name = selectedOptions[0]?.text
  showPicker.value = false
}
//
function handleShowPicker(index: number) {
  if (!isEdit.value) return true
  const value = formData.value[index]?.project_id as number
  showPicker.value = true
  selectedValues.value = [value]
  selectedIndex.value = index
}
// 提交
const checkSubmit = (value) => {
  return value || value !== 0
}
// 选择日期后 执行是否编辑状态
function handleEditLogic(today, curDay) {
  const year = curDay.format('YYYY-MM')
  const date = curDay.date()
  // 状态  // status 1: 填写错误 0 填写成功 2: 未提交
  // const status = get(cacheStore.monthData, [year, 'status', date, 'status'])
  // 填写数据
  const fillData = get(cacheStore.monthData, [year, 'working', date])
  // 日期未提交编写  则为编辑状态
  isEdit.value = !fillData
}
const checkTotal = computed(() => {
  let res = true
  if (totalTime.value === 100 || totalTime.value === 0) {
    res = false
  }
  return res
})
const onSubmit = async () => {
  if (!checkTotal) {
    showToast('总工时必须等于100%或者0%')
    return true
  }
  const projectSet = new Set()
  const project = formData.value.map((item) => {
    projectSet.add(item.project_id)
    return {
      ...item,
      w_value: item.w_value / 100,
      status: 0,
    }
  })
  if (project?.length !== 0) {
    // 修改和新增工时  校验
    const holiday = getHolidayStatus(appStore.selectDate, cacheStore)
    if (holiday === '假') {
      const confirm = await showConfirmDialog({
        title: '当天为法定节假日，是否提交？',
      })
      if (confirm !== 'confirm') return false
    }
    if ([6, 0].includes(dayjs(appStore.selectDate).day())) {
      if (holiday !== '班') {
        const confirm = await showConfirmDialog({
          title: '当天为周末节假日，是否提交？',
        })
        if (confirm !== 'confirm') return false
      }
    }
  }
  if (project.length !== projectSet.size) {
    showToast('不能填写相同项目')
    return true
  }
  const res = await saveWorkingHours({
    date: dayjs(appStore.selectDate).format('YYYY-MM-DD'),
    project,
  })
  if (res && res.code !== 0) {
    showToast(res.msg)
    return
  }
  // 删除项目操作
  const day = dayjs(appStore.selectDate)
  const month = day.format('YYYY-MM')
  // 清空项目时 清除缓存 且不存储摸版
  if (project.length === 0) {
    cacheStore.delMonthWorking(month, day.date())
    cacheStore.setMonthStatus(month, day.date(), { status: 2 })
  } else {
    cacheStore.setMonthWorking(month, day.date(), project)
    cacheStore.setMonthStatus(month, day.date(), { status: 0 })
    cacheStore.setWorking(project)
    tips.value = undefined
  }
  showToast('提交成功')
  isEdit.value = false
}

// 新增
function handleAdd() {
  formData.value.push({
    project_id: 0,
    project_name: '',
    w_value: 0,
  })
  finishPull()
}

// 删除
function handleDelete(index: number) {
  // if (formData.value.length === 1) {
  //   showToast({ message: '最少填写一个项目工时\n 或将工时填写0%', duration: 3500 })
  //   return
  // }
  selectedIndex.value = 0
  formData.value.splice(index, 1)
  handleLogic()
  finishPull()
}

// 工时关联 逻辑
function handleLogic() {
  let total = 0
  formData.value.forEach((item) => {
    total += item.w_value
  })
  totalTime.value = total
}

// pc端 删除操作
const swipeCellRef = ref()

function openDelete() {
  swipeCellRef.value.forEach((item) => {
    item.open({
      position: 'right',
    })
  })
}

// 使用模版
function handleReset() {
  showConfirmDialog({
    title: `是否重置当前（${dayjs(appStore.selectDate).format('YYYY-MM-DD')}）工时？`,
  })
    .then(() => {
      formData.value.splice(0)
      onSubmit()
    })
    .catch(() => {})
}
</script>

<style scoped lang="less">
.van-swipe-cell {
  animation-duration: 0.5s;
  animation-name: slideInLeft;
}
.van-form * {
  transition: all 300ms ease-in;
}
.delete-button {
  height: 100%;
}
:deep(.van-cell-group--inset) {
  border: 1px solid var(--van-cell-border-color);
}

.van-submit-bar {
  padding-top: 10px;
}
.van-skeleton {
  padding: 10px;
  margin-bottom: 10px;
}
.van-skeleton:first-child {
  .van-skeleton {
    margin-top: 10px;
  }
}
.van-form {
  padding-top: 10px;
}

.pulldown {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 60px;
  //padding: 10px 0 ;
  background: var(--van-background);
  .pulldown-wrapper {
    height: 100%;
    overflow: hidden;
  }
  .pulldown-list-item {
    list-style: none;
  }
  .pulldown-tips {
    padding: 20px;
    text-align: center;
    color: #999;
  }
}

.pull-refresh-open {
  top: 330px;
}
.pull-refresh-close {
  top: 130px;
}
.van-submit-bar {
  background: var(--van-background-2);
  .van-button {
    width: 90px;
    margin-left: 10px;
  }
}

.success {
  color: var(--van-success-color);
}
.danger {
  color: var(--van-danger-color);
}

@media (prefers-color-scheme: dark) {
  .van-submit-bar {
    background: var(--van-background);
  }
}
</style>
