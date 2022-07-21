<template>
  <div>
    <work-time-calen />
    <WorkTimeForm />
    <!-- <Demo/> -->
  </div>
  <!-- <van-pull-refresh v-model="loading" @refresh="onRefresh" @change="onChange"  :style="pullRefreshStyle">

  </van-pull-refresh> -->
</template>

<script lang="ts">
export default {
  name: 'HomeIndex',
}
</script>
<script setup lang="ts">
import WorkTimeForm from '/@/views/home/components/WorkTimeForm.vue'
import WorkTimeCalen from '/@/views/home/components/WorkTimeCalen.vue'
import Demo from '/@/views/home/components/demo.vue'
import { useStore } from '/@/stores'
import { getProjectConfig } from '/@/api/home'

onMounted(async () => {
  const store = useStore()
  if (store.projectVersionExpire) {
    const resData = await getProjectConfig()
    console.log(resData)
  }
})
</script>
