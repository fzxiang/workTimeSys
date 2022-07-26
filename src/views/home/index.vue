<template>
  <div>
    <work-time-calen />
    <WorkTimeForm :columns="columns" :defaultForm="defaultForm" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomeIndex',
}
</script>
<script setup lang="ts">
import WorkTimeForm from '/@/views/home/components/WorkTimeForm.vue'
import WorkTimeCalen from '/@/views/home/components/WorkTimeCalen.vue'
import { useStore } from '/@/stores'
import { getMonthWorkingHours, getProjectConfig, getUserConfig } from '/@/api/home'
import { localStore } from '/@/utils/local-storage'
import setting from '/@/setting/projectSetting'
import { getVersionInfo } from '/@/api/sso'
import { onBeforeMount } from 'vue'
import dayjs from 'dayjs'

const { GET_PROJECT_VERSION, GET_WORKING_VERSION, GET_WORKING, GET_PROJECT } = setting
const PROJECT = GET_PROJECT()
const PROJECT_VERSION = GET_PROJECT_VERSION()
const WORKING = GET_WORKING()
const WORKING_VERSION = GET_WORKING_VERSION()

const columns = ref<any>([])
const store = useStore()

const changeStore = (store, key, value) => {
  store[key] = value
}
const checkStorageVersion = async () => {
  const { working_version, project_version } = await getVersionInfo()
  const WORKING_VERSION = GET_WORKING_VERSION()
  const PROJECT_VERSION = GET_PROJECT_VERSION()
  const [local_working_version, local_project_version] = [
    localStore.get(WORKING_VERSION),
    localStore.get(PROJECT_VERSION),
  ]
  if (local_working_version !== undefined) {
    changeStore(store, 'workingVersionExpire', local_working_version < working_version)
  }
  // 为0 或 undefined
  else {
    store.workingVersionExpire = true
  }
  if (local_project_version !== undefined) {
    changeStore(store, 'projectVersionExpire', local_project_version < project_version)
  }
  // 为0 或 undefined
  else {
    store.projectVersionExpire = true
  }
  return { working_version, project_version }
}

// 填写状态
interface DefaultForm {
  w_value?: number
}
const defaultForm = ref<any>([])
onMounted(async () => {
  await checkStorageVersion()
  // 项目配置 校验版本
  if (store.projectVersionExpire) {
    const { project, project_version } = await getProjectConfig()
    columns.value = project.map((item) => {
      return {
        text: item.name,
        value: item.id,
      }
    })
    localStore.set(PROJECT, columns.value, false)
    localStore.set(PROJECT_VERSION, project_version, false)
    store.projectVersionExpire = false
  } else {
    const projectCache = localStore.get(PROJECT)
    if (projectCache && projectCache.length !== 0) {
      columns.value = projectCache
    }
  }
  // 玩家默认配置
  if (store.workingVersionExpire) {
    const data = await getUserConfig()
    defaultForm.value = data.default
    localStore.set(WORKING, data.default, false)
    localStore.set(WORKING_VERSION, data.version, false)
    store.workingVersionExpire = false
  } else {
    const workingCache = localStore.get(WORKING)
    if (workingCache && workingCache.length !== 0) {
      defaultForm.value = workingCache
    }
  }
})

onBeforeMount(async () => {
  // const today = dayjs()
  // const monthData = await getMonthWorkingHours({
  //   year: today.year(),
  //   month: today.month() + 1,
  // })
  // await store.initMonthData(monthData)
})
</script>
