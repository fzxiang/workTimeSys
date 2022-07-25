<template>
  <h4>{{ title }} 年</h4>
  <van-swipe
    class="my-swipe"
    :show-indicators="false"
    :loop="false"
    @change="onChange"
    :initial-swipe="initialSwipe"
  >
    <template v-for="item in date" :key="item.year">
      <van-swipe-item>
        <van-button type="primary" size="small" @click="handleClick(0)" plain>1 月</van-button>
        <van-button type="primary" size="small" @click="handleClick(1)" plain>2 月</van-button>
        <van-button type="primary" size="small" @click="handleClick(2)" plain>3 月</van-button>
        <van-button type="primary" size="small" @click="handleClick(3)" plain>4 月</van-button>
        <van-button type="primary" size="small" @click="handleClick(4)" plain>5 月</van-button>
        <van-button type="primary" size="small" @click="handleClick(5)" plain>6 月</van-button>
      </van-swipe-item>
      <van-swipe-item>
        <div>
          <van-button type="primary" size="small" @click="handleClick(6)" plain>7 月</van-button>
          <van-button type="primary" size="small" @click="handleClick(7)" plain>8 月</van-button>
          <van-button type="primary" size="small" @click="handleClick(8)" plain>9 月</van-button>
          <van-button type="primary" size="small" @click="handleClick(9)" plain>10 月</van-button>
          <van-button type="primary" size="small" @click="handleClick(10)" plain>11 月</van-button>
          <van-button type="primary" size="small" @click="handleClick(11)" plain>12 月</van-button>
        </div>
      </van-swipe-item>
    </template>
  </van-swipe>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useStore } from '/@/stores'

const store = useStore()
const today = dayjs(store.selectDate)

const date = ref([])
const title = ref()
const year = today.year()
title.value = year
date.value = [year - 2, year - 1, year]

const initialSwipe = today.month() / 6 > 1 ? (date.value.length * 2) :( date.value.length * 2 - 1)
console.log(initialSwipe)

function onChange(index) {
  const i = parseInt(index / 2 + '')
  title.value = date.value[i]
  console.log(index)
  if (index === 0) {
    const firstDate = date.value[index]
    date.value.unshift(firstDate - 1)
  }
}

// as interface
interface Emits {
  (e: 'change', newValue: string): void
}
const emits = defineEmits<Emits>()
function handleClick(index) {
  const value = dayjs(new Date(title.value, index)).format('YYYY-MM-DD')
  emits('change', value)
}
</script>

<style lang="less" scoped>
.van-button {
  border: none;
  width: 60px;
}
h4 {
  margin: 10px auto;
}
</style>
