<script setup lang="ts">
import bg from '@/assets/images/h_bg.png'
import { historyList } from '@/composables/history'

const router = useRouter()
historyList.value = []
</script>

<template>
  <div class="h-full h-full bg-[length:100%_100%] flex flex-col items-center justify-center bg-no-repeat" :style="{ backgroundImage: `url(${bg})` }">
    <img src="@/assets/images/h_text.png" alt="">
    <div class="h-150 mt-100 flex justify-around items-center gap-x-100">
      <img src="@/assets/images/h_w.png" class="w-366 h-126 cp" alt="" @click="router.push({ name: 'inquire_file', query: { type: '首页' } }), historyList.push('home')">
      <img src="@/assets/images/h_g.png" class="w-366 h-126 cp" alt="" @click="router.push({ name: 'inquire', query: { type: '档案查询' } }), historyList.push('home')">
    </div>
    <!-- <div class="mt-50 px-50 py-20 rounded-10 text-30 fwbold bg-red text-white cp" @click="router.push({ name: 'inquire' })">进 入</div> -->
  </div>
</template>

<style lang='scss' scoped>

</style>
