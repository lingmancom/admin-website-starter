<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useTheme } from '@/hooks/useTheme'

const globalStore = useGlobalDataStore()
globalStore.getSystem()
// 将 Element Plus 的语言设置为中文

const { initTheme } = useTheme()

/** 初始化主题 */
initTheme()
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
