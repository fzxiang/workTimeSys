<template>
  <van-form @submit="onSubmit" input-align="right">
    <div class="pulldown" :class="pullRefreshClass">
      <div ref="scroll" class="pulldown-wrapper">
        <div class="pulldown-content">
          <div v-if="appStore.showFormData" class="pulldown-list">
            <van-swipe-cell
              name="swipeCell"
              v-for="(item, index) in formData"
              :key="index"
              :stop-propagation="true"
              ref="swipeCell"
              :disabled="!isEdit"
            >
              <van-cell-group v-if="isEdit">
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
                    />
                    <van-slider
                      v-model="item.w_value"
                      step="5"
                      style="margin: 0 30px"
                      @change="handleLogic"
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
                    />
                  </template>
                </van-field>
              </van-cell-group>
              <van-cell-group v-else>
                <van-field :label="item.project_name" :model-value="item.w_value + '%'" readonly />
              </van-cell-group>
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
          <van-empty v-else description="未来工作日不能填写" />
        </div>
      </div>
    </div>

    <van-submit-bar>
      <template v-if="appStore.showFormData" #default>
        <p>
          总工时:
          <span :class="!checkTotal > 0 ? 'success' : 'danger'">{{ totalTime }}%</span>
        </p>
      </template>
      <template v-if="appStore.showFormData" #button>
        <van-button round type="success" v-show="!isEdit" @click="isEdit = true"> 修改 </van-button>
        <van-button round type="primary" plain v-show="isEdit" @click="handleAdd">
          新增项目
        </van-button>
        <van-button round type="primary" v-show="isEdit" native-type="submit"> 提交 </van-button>
      </template>
      <template v-else #button></template>
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
import type { PickerConfirmEventParams } from 'vant'
import { showToast } from 'vant'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import PullDown from '@better-scroll/pull-down'
import { saveWorkingHours } from '/@/api/home'
import dayjs from 'dayjs'
import { useCacheStore } from '/@/store/modules/cache'
import { useAppStore } from '/@/store/modules/app'
import get from 'lodash.get'

const cacheStore = useCacheStore()
const appStore = useAppStore()

/**
 * 下拉刷新
 * **/
BScroll.use(MouseWheel)
BScroll.use(PullDown)

const pullRefreshClass = ref('pull-refresh-open')
watchEffect(() => {
  if (appStore.calendar === 'close') {
    pullRefreshClass.value = 'pull-refresh-close'
  } else {
    pullRefreshClass.value = 'pull-refresh-open'
  }
  finishPull()
})

const scroll = ref()
const bscroll = ref()
const isPulling = ref(false)
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
const formData = ref<[FormData]>([
  {
    project_id: 0,
    project_name: '',
    w_value: 100,
  },
])
const showPicker = ref(false)
const totalTime = ref(100)
// 编辑和提交状态
const isEdit = ref(false)

watch(
  () => appStore.selectDate,
  (val, oldVal) => {
    const day = dayjs(val)
    const month = day.format('YYYY-MM')
    const $D = day.date()
    const propsMonthDataItem = cacheStore.getMonthData[month]
    if (propsMonthDataItem && propsMonthDataItem[$D]) {
      formData.value = propsMonthDataItem[$D].map((item) => {
        return {
          ...item,
          w_value: parseInt(item.w_value * 100 + ''),
        }
      })
    } else {
      if (cacheStore.working.length !== 0) {
        formData.value = cacheStore.working.map((item) => {
          return {
            ...item,
            w_value: parseInt(item.w_value * 100 + ''),
          }
        })
      }
    }
    handleLogic()
  },
  { immediate: true },
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
  // 如果是当天 则为编辑状态
  if (today.format('YYYY-MM-DD') === curDay.format('YYYY-MM-DD')) {
    isEdit.value = true
    return true
  }
  const year = curDay.format('YYYY-MM')
  const date = curDay.date()
  const status = get(cacheStore.monthData, [year, date, '0', 'status'])
  // 日期未提交编写  则为编辑状态
  isEdit.value = status !== 0
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
  } else {
    const day = dayjs(appStore.selectDate)
    const month = day.format('YYYY-MM')
    cacheStore.setMonthDayData(month, day.date(), project)
    cacheStore.setWorking(project)
    showToast('提交成功')
    isEdit.value = false
  }
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
  if (formData.value.length === 1) {
    showToast('最少填写一个项目工时')
    return
  }
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
</script>

<style scoped lang="less">
.van-form * {
  transition: all 0.3s ease;
}
.delete-button {
  height: 100%;
}
:deep(.van-cell-group--inset) {
  border: 1px solid var(--van-cell-border-color);
}

.van-submit-bar {
  padding-top: 10px;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14),
    0 1px 18px 0 rgba(0, 0, 0, 0.12);
}
.van-cell-group {
  margin-bottom: 10px;
}
.van-swipe-cell:first-child {
  .van-cell-group {
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
  top: 140px;
  bottom: 60px;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14),
  0 1px 18px 0 rgba(0, 0, 0, 0.12);
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
  top: 300px;
}
.pull-refresh-close {
  top: 140px;
}
.van-submit-bar .van-button {
  width: 120px;
  margin-left: 10px;
}

.success {
  color: var(--van-success-color);
}
.danger {
  color: var(--van-danger-color);
}
</style>
