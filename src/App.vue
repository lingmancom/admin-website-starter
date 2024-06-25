<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useTheme } from '@/hooks/useTheme'

const globalStore = useGlobalDataStore()
globalStore.getSystem()
globalStore.loadPermission()
// 将 Element Plus 的语言设置为中文

const modalStore = useModalStore()

const { initTheme } = useTheme()

/** 初始化主题 */
initTheme()

const previewStore = PreviewStore()
// 控制图片预览组件显现的变量
const imageViewerVisible = computed(() => previewStore.imageViewer.show)
</script>

<template>
  <el-config-provider :locale="zhCn">
    <teleport to="body">
      <component
        :is="vNode" v-for="vNode, idx in modalStore.modalList"
        :key="idx"
      />
    </teleport>
    <router-view />

    <c-image-viewer v-if="imageViewerVisible"></c-image-viewer>
  </el-config-provider>
</template>
