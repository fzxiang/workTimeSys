<template>
  <van-form @submit="onSubmit" input-align="right">
    <div class="pullup" :style="pullRefreshStyle">
      <div ref="scroll" class="pullup-wrapper" :style="pullRefreshStyle">
        <div class="pullup-content">
          <div class="pullup-list">
            <van-swipe-cell v-for="(item, index) in formData" :key="index">
              <van-cell-group :inset="true">
                <van-field
                  size="large"
                  label-width="40px"
                  v-model="item.project_name"
                  is-link
                  readonly
                  name="project_id"
                  label="项目"
                  placeholder="点击选择项目"
                  @click="handleShowPicker(index)"
                  error-message-align="right"
                  :rules="[{ required: true, message: '请选择项目' }]"
                />
                <van-field name="slider" label="工时" size="large">
                  <template #input>
                    <van-button
                      style="width: 60px"
                      icon="minus"
                      plain
                      size="mini"
                      type="primary"
                      @click="handleSteper('minus', item)"
                      :disabled="item.w_value === 0"
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
                    <van-button
                      style="width: 60px"
                      icon="plus"
                      plain
                      size="mini"
                      type="primary"
                      @click="handleSteper('plus', item)"
                      :disabled="item.w_value === 100"
                    />
                  </template>
                </van-field>
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
          <!-- <div class="pullup-tips">
            <div v-if="isPulling" class="after-trigger">
              <span class="pullup-txt">加载中...</span>
            </div>
          </div> -->
        </div>
      </div>
    </div>

    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker
        v-model="selectedValues"
        :columns="props.columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>

    <van-row gutter="10" class="bottom-btn">
      <van-col span="10">
        <p>
          总工时: <span :class="totalTime === 100 ? 'success' : 'danger'">{{ totalTime }}%</span>
        </p>
      </van-col>
      <van-col span="7">
        <van-button round block plain type="primary" @click="handleAdd"> 新增项目 </van-button>
      </van-col>
      <van-col span="7">
        <van-button round block type="primary" native-type="submit"> 提交 </van-button>
      </van-col>
    </van-row>
  </van-form>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, defineProps } from 'vue'
import { showToast } from 'vant'
import type {
  PickerConfirmEventParams,
  // PickerProps,
  // PickerColumn,
  // PickerOption,
  // PullRefreshProps,
} from 'vant'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import PullDown from '@better-scroll/pull-down'
import { saveWorkingHours } from '/@/api/home'
import { useStore } from '/@/stores'
import dayjs from 'dayjs'

const store = useStore()

/**
 * 下拉刷新
 * **/
BScroll.use(MouseWheel)
BScroll.use(PullDown)
const pullRefreshStyle = ref({
  height: window.innerHeight - 130 - 84 + 'px',
  // background: '#eee',
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
      threshold: 100,
      stop: 0,
    },
  })
  // bscroll.value.on('pullingDown', pullingDownHandler)
  bscroll.value.on('scroll', scrollHandler)
  bscroll.value.on('scrollEnd', (e) => {
    console.log('scrollEnd', e)
  })
  // bscroll.value.on('scroll', pullingHandler)
})

function scrollHandler(pos) {
  // console.log(pos)
}
function finishPull() {
  nextTick(() => {
    bscroll.value.refresh()
  })
}
function crollHandler(pos) {
  console.log(pos.y)
}
async function pullingDownHandler() {
  isPulling.value = true

  // await requestData()

  finishPull()
}
async function requestData() {
  try {
    const newData = await ajaxGet(/* url */)
  } catch (err) {
    // handle err
    console.log(err)
  }
}
function ajaxGet(/* url */) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(20)
    }, 1000)
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
const props = defineProps({
  columns: Array,
  defaultForm: Array,
})

watch(
  () => store.selectDate,
  (val, oldVal) => {
    const day = dayjs(val)
    const { $D } = day
    const propsMonthDataItem = store.getMonthData[$D]
    if (propsMonthDataItem) {
      const data = propsMonthDataItem.map((item) => {
        return {
          ...item,
          w_value: parseInt(item.w_value * 100 + ''),
        }
      })
      formData.value = data
    } else {
      if (props.defaultForm.length !== 0) {
        const data = props.defaultForm.map((item) => {
          return {
            ...item,
            w_value: parseInt(item.w_value * 100 + ''),
          }
        })
        formData.value = data
      }
    }
    handleLogic()
  },
  { immediate: true },
)

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
  const value = formData.value[index]?.project_id
  showPicker.value = true
  selectedValues.value = [value]
  selectedIndex.value = index
}
// 提交
const onSubmit = async () => {
  if (totalTime.value !== 100) {
    showToast('总工时必须等于100%')
    return true
  }
  const project = formData.value.map((item) => {
    return {
      ...item,
      w_value: item.w_value / 100,
    }
  })
  await saveWorkingHours({
    date: store.selectDate,
    project,
  })
  const { $D } = dayjs(store.selectDate)
  store.setMonthData($D, project)
  showToast('提交成功')
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

// 步进器
function handleSteper(type, item) {
  event.stopPropagation()
  if (type === 'plus') {
    item.w_value += 5
  } else if (type === 'minus') {
    item.w_value -= 5
  }
  handleLogic()
}

function handleSwipeCell(param, e) {
  console.log(param, e)
}
</script>

<style scoped lang="less">
.delete-button {
  height: 100%;
}
:deep(.van-cell-group--inset) {
  border: 1px solid var(--van-cell-border-color);
}
.bottom-btn {
  background: var(--van-background);
  padding: 15px;
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
.pullup {
  .pullup-wrapper {
    overflow: hidden;
  }
  .pullup-list-item {
    padding: 10px 0;
    list-style: none;
  }
  .pullup-tips {
    padding: 20px;
    text-align: center;
    color: #999;
  }
}

.success {
  color: var(--van-success-color);
}
.danger {
  color: var(--van-danger-color);
}
</style>
