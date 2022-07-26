<template>
  <h4>{{ title }} 年</h4>
  <van-swipe
    class="my-swipe"
    :show-indicators="false"
    :loop="false"
    :initial-swipe="initialSwipe"
    @change="onChange"
  >
    <template v-for="item in date" :key="item.year">
      <van-swipe-item>
        <van-button
          type="primary"
          size="small"
          @click="handleClick(0)"
          :plain="currentMonth !== year + 0"
          >1 月</van-button
        >
        <van-button
          type="primary"
          size="small"
          @click="handleClick(1)"
          :plain="currentMonth !== year + 1"
          >2 月</van-button
        >
        <van-button
          type="primary"
          size="small"
          @click="handleClick(2)"
          :plain="currentMonth !== year + 2"
          >3 月</van-button
        >
        <van-button
          type="primary"
          size="small"
          @click="handleClick(3)"
          :plain="currentMonth !== year + 3"
          >4 月</van-button
        >
        <van-button
          type="primary"
          size="small"
          @click="handleClick(4)"
          :plain="currentMonth !== year + 4"
          >5 月</van-button
        >
        <van-button
          type="primary"
          size="small"
          @click="handleClick(5)"
          :plain="currentMonth !== year + 5"
          >6 月</van-button
        >
      </van-swipe-item>
      <van-swipe-item>
        <div>
          <van-button
            type="primary"
            size="small"
            @click="handleClick(6)"
            :plain="currentMonth !== year + 6"
            >7 月</van-button
          >
          <van-button
            type="primary"
            size="small"
            @click="handleClick(7)"
            :plain="currentMonth !== year + 7"
            >8 月</van-button
          >
          <van-button
            type="primary"
            size="small"
            @click="handleClick(8)"
            :plain="currentMonth !== year + 8"
            >9 月</van-button
          >
          <van-button
            type="primary"
            size="small"
            @click="handleClick(9)"
            :plain="currentMonth !== year + 9"
            >10 月</van-button
          >
          <van-button
            type="primary"
            size="small"
            @click="handleClick(10)"
            :plain="currentMonth !== year + 10"
            >11 月</van-button
          >
          <van-button
            type="primary"
            size="small"
            @click="handleClick(11)"
            :plain="currentMonth !== year + 11"
            >12 月</van-button
          >
        </div>
      </van-swipe-item>
    </template>
  </van-swipe>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
// import { useCacheStore } from '/@/store/modules/cache'
// import { useAppStore } from '/@/store/modules/app'

// const cacheStore = useCacheStore()
// const appStore = useAppStore()
const today = dayjs(new Date())

const date = ref([])
const title = ref()
const year = today.year()
const month = ref(today.month())

title.value = year
date.value = [year - 2, year - 1, year]

const currentMonth = computed(() => {
  return title.value + month.value
})
const initialSwipe = today.month() / 6 > 1 ? date.value.length * 2 : date.value.length * 2 - 1
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
  month.value = index
  const value = dayjs(new Date(title.value, index)).format('YYYY-MM-DD')
  emits('change', value)
}
</script>

<style lang="less" scoped>
.van-button {
  border: none;
  width: 60px;
  border-radius: 0;
}
h4 {
  margin: 10px auto;
}
</style>
