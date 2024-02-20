<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/store/modules/settings'
import logo from '@/assets/layouts/logo.png?url'

interface Props {
  collapse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  collapse: true,
})

const settingsStore = useSettingsStore()
const { layoutMode } = storeToRefs(settingsStore)

const title = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <div class="layout-logo-container" :class="{ 'collapse': props.collapse, 'layout-mode-top': layoutMode === 'top' }">
    <transition>
      <router-link v-if="props.collapse" key="collapse" to="/">
        <img :src="logo" class="layout-logo">
      </router-link>
      <router-link v-else key="expand" to="/">
        <div class="h-full w-220px flex justify-center items-center truncate">
          <img class="w40 h40 mr2" src="@/assets/logo.png">
          <h3 class="c-#fff">
            {{ title }}
          </h3>
        </div>
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.layout-logo-container {
  position: relative;
  width: 100%;
  height: var(--v3-header-height);
  line-height: var(--v3-header-height);
  background-color: transparent;
  text-align: center;
  overflow: hidden;
  .layout-logo {
    display: none;
  }
  .layout-logo-text {
    height: 100%;
    vertical-align: middle;
  }
}

.layout-mode-top {
  height: var(--v3-navigationbar-height);
  line-height: var(--v3-navigationbar-height);
}

.collapse {
  .layout-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    display: inline-block;
  }
  .layout-logo-text {
    display: none;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
