// /components/modules/CImageViewer/index.vue

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const mask = ref(null as HTMLDivElement | null)
const previewStore = PreviewStore()
const imageViewerUrl = computed(() => previewStore.imageViewer.url)
const imageViewerClose = computed(() => previewStore.imageViewer.close)
onMounted(() => {
  nextTick(() => {
    // 获取预览的遮罩层
    mask.value = document.querySelector('.el-image-viewer__mask') as HTMLDivElement
    if (mask.value) {
      // 遮罩层增加点击事件，关闭预览
      mask.value.addEventListener('click', imageViewerClose.value)
    }
  })
})
onBeforeUnmount(() => {
  if (mask.value) {
    // 遮罩层增加点击事件，关闭预览
    previewStore.imageViewer.close()
    mask.value.removeEventListener('click', previewStore.imageViewer.close)
  }
})
</script>

<template>
  <el-image-viewer v-bind="$attrs" :url-list="[`${imageViewerUrl}`]" @close="imageViewerClose" />
</template>
