<template>
  <div class="card-content">
    <van-steps direction="vertical" :active="props.active">
      <van-step v-for="item in props.allData" :key="item.day">
        <div class="flex-wrap" :class="getStatusClass(item.status)" style="margin-bottom: 10px">
          <p>{{ item.day }}</p>
          <p>{{ item.week }}</p>
        </div>
        <div class="flex-wrap" v-for="childItem in item.data" :key="childItem.w_date">
          <h4 style="margin-bottom: 5px">
            {{ childItem.project_name }}
          </h4>
          <div>
            <van-tag plain :type="getStatusClass(item.status)">
              {{ parseInt(childItem.w_value * 100 + '') }}%
            </van-tag>
          </div>
        </div>
      </van-step>
    </van-steps>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps(['active', 'allData'])
enum Status {
  success = 0,
  error = 1,
  other = 2,
}
const getStatusClass = (status) => {
  if (status === Status.success) return 'primary'
  else if (status === Status.error) return 'danger'
}
</script>

<style lang="less" scoped>
.van-steps {
  text-align: left;
  h4,
  p {
    margin: 0;
  }
  .flex-wrap {
    display: flex;
    justify-content: space-between;
  }
  .primary {
    //color: var(--van-tag-primary-color);
  }
  .danger {
    color: var(--van-tag-danger-color);
  }
}
.card-content {
  margin: var(--van-padding-xs);
  border-radius: var(--van-padding-base);
  overflow: hidden;
}
.danger {
  color: var(--van-danger-color);
}
</style>
