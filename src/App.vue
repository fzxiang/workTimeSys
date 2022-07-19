<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import WorkTime from './views/WorkTime/index.vue'
</script>

<template>
  <Suspense>
    <div class="wrapper">
      <WorkTime class="wrapperItem" />
    </div>
  </Suspense>
</template>

<style scoped>

.wrapper {
  display: flex;
  justify-content: center;
}
.wrapperItem {
  background: #eee;
  
}
@media screen and (min-width: 1280px) {
  .wrapperItem {
    width: 800px;
  }
}
</style>
