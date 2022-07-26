<template>
  <div>
    <work-time-calen />
    <WorkTimeForm />
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
import { getProjectConfig, getUserConfig } from '/@/api/home'
import { getVersionInfo } from '/@/api/sso'
import { useCacheStore } from '/@/store/modules/cache'

const cacheStore = useCacheStore()

const changeStore = (store, key, value) => {
  store[key] = value
}
const checkStorageVersion = async () => {
  const { working_version, project_version } = await getVersionInfo()

  // 默认配置过期
  if (cacheStore.workingVersion) {
    cacheStore.setWorkingVersionExpire(cacheStore.workingVersion < working_version)
  } else {
    cacheStore.setWorkingVersionExpire(true)
  }

  // 项目过期
  if (cacheStore.projectVersion) {
    cacheStore.setProjectVersionExpire(cacheStore.projectVersion < project_version)
  } else {
    cacheStore.setProjectVersionExpire(true)
  }

  return { working_version, project_version }
}

onMounted(async () => {
  await checkStorageVersion()

  // 项目配置 校验版本过期
  if (cacheStore.projectVersionExpire) {
    const { project, project_version } = await getProjectConfig()
    const projectData = project.map((item) => {
      return {
        text: item.name,
        value: item.id,
      }
    })
    cacheStore.setProject(projectData)
    cacheStore.setProjectVersion(project_version)
    cacheStore.setProjectVersionExpire(false)
  }
  // 玩家默认配置
  if (cacheStore.workingVersionExpire) {
    const res = await getUserConfig()
    cacheStore.setWorkingVersion(res.version)
    cacheStore.setWorking(res.default)
    cacheStore.setWorkingVersionExpire(false)
  }
})
</script>
