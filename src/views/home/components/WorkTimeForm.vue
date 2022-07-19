<template>
  <van-form @submit="onSubmit">
    <van-pull-refresh v-model="loading" @refresh="onRefresh" @change="onChange"  :style="pullRefreshStyle">
      <van-swipe-cell v-for="(item, index) in formData" :key="index" >
        <van-cell-group :inset="true" style="margin-top: 15px">
          <van-field
            v-model="item.project_name"
            is-link
            readonly
            name="project"
            label="项目"
            placeholder="点击选择项目"
            @click="handleShowPicker(index)"
          />
          <van-field name="slider" label="工时">
            <template #input>
              <van-slider v-model="item.time" step="5" style="margin-right: 20px" @update:model-value="handleSlider(index, item.time)">
                <template #button>
                  <van-button type="primary" size="mini" round style="width: 40px">{{ item.time }}%</van-button>
                </template>
              </van-slider>
            </template>
          </van-field>
        </van-cell-group>
        <template #right>
          <van-button square type="danger" text="删除" class="delete-button" @click="handleDelete(index)"/>
        </template>
      </van-swipe-cell>
    </van-pull-refresh>

    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker
        v-model="formData[selectedIndex].project"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
    <van-row gutter="20" style="margin: 15px; margin-top: 15px">
      <van-col span="12">
          <van-button round block plain type="primary" @click="handleAdd">
          新增项目
        </van-button>
      </van-col>
      <van-col span="12">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </van-col>
    </van-row>
  </van-form>
</template>


<script setup lang="ts">
import { ref , unref} from 'vue'
import { Toast } from "vant";
import type {
  PickerProps,
  PickerColumn,
  PickerOption,
  PullRefreshProps
} from 'vant';


/**
 * 下拉刷新
 * **/
const pullRefreshStyle = {
  'min-height': window.innerHeight + 'px'
}
console.log(pullRefreshStyle)
const count = ref(0);
const loading = ref(false);
const onRefresh = () => {
  setTimeout(() => {
    Toast('刷新成功');
    loading.value = false;
    count.value++;
  }, 1000);
};
const onChange = (pullProps: PullRefreshProps) => {
  console.log(pullProps)
}

/**
 * 表单
 * **/
interface FormData {
  project: any,
  project_name: any,
  time: number
}
const formData = ref<[FormData]>([
  {
    project: 0,
    project_name: '',
    time: 100,
  }
])
const showPicker = ref(false);
const columns = [
  { text: '芝麻官', value: 1 },
  { text: '明皇帝', value: 2 },
  { text: '妖修', value: 3 },
  { text: '仙命诀', value: 4 },
  { text: '混合云', value: 5 },
];
const selectedIndex = ref(0);


const onConfirm = (obj: any) => {
  formData.value[selectedIndex.value].project = obj.value
  formData.value[selectedIndex.value].project_name = obj.text
  showPicker.value = false;
};

// 提交
const onSubmit = () => {
  Toast('表单提交');
}

// 新增
function handleAdd () {
  formData.value.push({
    project: 0,
    project_name: '',
    time: 0,
  })
}

// 删除
function handleDelete(index: number) {
  if(formData.value.length === 1) {
     Toast('最少填写一个项目工时');
    return
  }
  selectedIndex.value = 0
  formData.value.splice(index, 1)
  console.log(index)
}
//
function handleShowPicker (index: number) {
  showPicker.value = true
  selectedIndex.value = index
}

function handleSlider (index: number, value: number) {
  const data = unref(formData)
  if( data.length > 1) {
    let total = 0
    data.forEach((item) => {
      total += item.time 
    });

    for (let i = 0; i < data.length; i++) {
      if(data[i].time > 0) {
        if(i !== index) {
          data[i].time = data[i].time + (100 - total)
          return false
        }
      }
    }
    formData.value.every((item,idx) => {
      if(idx !== index && item.time !== 0) {
        item.time = item.time - 5
        return false
      }
    })
  }
}
</script>

<style scoped lang="less">
  .delete-button {
    height: 100%;
  }
  :deep(.van-cell-group--inset) {
    border: 1px solid var(--van-cell-border-color)
  }

</style>