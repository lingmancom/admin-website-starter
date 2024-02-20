<script setup lang="ts">
// const globalStore = useGlobalDataStore()
// globalStore.getFriendshipLinks()
const globalStore = useGlobalStore()
// globalStore.loadHomeData()

const globalDataStore = useGlobalDataStore()

// const list = computed(() => globalStore.friendshipLinks)

const isShow = ref(false)
const showList = computed(() => globalStore.homeData.bottomLink)

function handleMouseLeave() {
  isShow.value = false
}

function handleClick(item) {
  window.open(item.url, '__blank')
}
</script>

<template>
  <div class="bottom-box relative w-full c-white bg-main" @mouseleave="handleMouseLeave">
    <div class="wrap px30 pt-20 pb-10px">
      <div class="text-18px font-bold mb-18px">友情链接</div>
      <div class="container flex flex-wrap gap-x-64px gap-y-20px">
        <div v-for="item in showList" :key="item.id" class="title cp" un-hover="text-yellow" @click="handleClick(item)">
          {{ item.title }}
        </div>
      </div>
      <div class="text-16px text-center mt-28px">{{ globalDataStore.system.copyright }}</div>
    </div>
  </div>
  <!-- <span class="bg-white block min-h-40 tc flex items-center justify-center">Copyright 版权所有武警江苏总队</span> -->
</template>

<style lang='scss' scoped>
</style>
