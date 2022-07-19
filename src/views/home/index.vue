
<template>
  <div>
    <work-time-calen />
    <WorkTimeForm />
  </div>
  <!-- <van-pull-refresh v-model="loading" @refresh="onRefresh" @change="onChange"  :style="pullRefreshStyle">

  </van-pull-refresh> -->
</template>

<script setup lang="ts">

import WorkTimeForm from "@/views/home/components/WorkTimeForm.vue";
import WorkTimeCalen from "@/views/home/components/WorkTimeCalen.vue";

</script>
