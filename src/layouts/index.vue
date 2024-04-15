<script lang="ts" setup>
import { computed, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import useResize from './hooks/useResize'
import LeftMode from './LeftMode.vue'
import TopMode from './TopMode.vue'
import LeftTopMode from './LeftTopMode.vue'
import { RightPanel, Settings } from './components'
import { useWatermark } from '@/hooks/useWatermark'
import { useSettingsStore } from '@/store/modules/settings'
import { useAppStore } from '@/store/modules/app'
import { DeviceEnum } from '@/constants/app-key'
import { getCssVariableValue, setCssVariableValue } from '@/utils'

/** Layout 布局响应式 */
useResize()
const { setWatermark, clearWatermark } = useWatermark()

const appStore = useAppStore()
const settingsStore = useSettingsStore()

const { showSettings, layoutMode, showTagsView, showWatermark, showGreyMode, showColorWeakness }
  = storeToRefs(settingsStore)

const classes = computed(() => {
  return {
    showGreyMode: showGreyMode.value,
    showColorWeakness: showColorWeakness.value,
  }
})

// #region 隐藏标签栏时删除其高度，是为了让 Logo 组件高度和 Header 区域高度始终一致
const cssVariableName = '--v3-tagsview-height'
const v3TagsviewHeight = getCssVariableValue(cssVariableName)
watchEffect(() => {
  showTagsView.value
    ? setCssVariableValue(cssVariableName, v3TagsviewHeight)
    : setCssVariableValue(cssVariableName, '0px')
})
// #endregion

/** 开启或关闭系统水印 */
watchEffect(() => {
  showWatermark.value ? setWatermark(import.meta.env.VITE_APP_TITLE) : clearWatermark()
})
</script>

<template>
  <div :class="classes">
    <!-- 左侧模式 -->
    <LeftMode v-if="layoutMode === 'left' || appStore.device === DeviceEnum.Mobile" />
    <!-- 顶部模式 -->
    <TopMode v-else-if="layoutMode === 'top'" />
    <!-- 混合模式 -->
    <LeftTopMode v-else-if="layoutMode === 'left-top'" />
    <!-- 右侧设置面板 -->
    <RightPanel v-if="showSettings">
      <Settings />
    </RightPanel>

    <!-- 版本号 -->
    <div class="fixed bottom-0 left-0 z-9999999 pl-10 pb-10 c-#ffffff55 text-14">
      {{ appStore.versions.clientVersion }} - {{ appStore.versions.serverVersion }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.showGreyMode {
  filter: grayscale(1);
}

.showColorWeakness {
  filter: invert(0.8);
}
</style>
