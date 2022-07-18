<template>
    <van-form @submit="onSubmit">
      <van-swipe-cell v-for="(item, index) in formData" :key="index" >
        <van-cell-group inset style="margin-top: 15px">
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
              <van-slider v-model="item.time" step="5" style="margin-right: 20px">
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
import { ref } from 'vue'
import type {
  PickerObjectOption,
} from 'vant';

/**
 * 表单
 * **/
const formData = ref([
  {
    project: '',
    project_name: '',
    time: 0,
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


const onConfirm = (obj: PickerObjectOption) => {
  formData.value[selectedIndex.value].project = obj.value
  formData.value[selectedIndex.value].project_name = obj.text
  // result.value = selectedOptions[0]?.text;
  showPicker.value = false;
};



// 提交
const onSubmit = () => {
  console.log('表单提交')
}
// 新增
function handleAdd () {
  formData.value.push({
    project: '',
    project_name: '',
    time: 0,
  })
}
// 删除
function handleDelete(index: number) {
  if(formData.value.length === 1) {
    return
  }
  formData.value.splice(index, 1)
  console.log(index)
}
//
function handleShowPicker (index: number) {
  showPicker.value = true
  selectedIndex.value = index
}
</script>

<style scoped>
  .delete-button {
    height: 100%;
  }
</style>