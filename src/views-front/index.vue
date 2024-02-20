<script setup name="home" lang="ts">
import mainBox from './home/components/mainBox.vue'
import { useGlobalStore } from '@/store/modules/front-global'

// const globalStore = useGlobalDataStore()
const globalStore = useGlobalStore()
globalStore.loadHomeData()
// globalStore.loadHomeData()
// globalStore.getHoliday()

// globalStore.getNavigation()

// const rightList = computed(() => globalStore.home.linkList.right_list)
</script>

<template>
  <div class="home flex flex-col h-full justify-between">
    <mainBox></mainBox>
    <div class="body wrap flex-grow">
      <div class="flex flex-wrap h-full min-h-full bg-white py-30 px-30">
        <router-view></router-view>
      </div>
    </div>
    <BottomBox></BottomBox>
  </div>
</template>
