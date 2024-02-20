<script setup lang="ts">
import bg from '@/assets/518bg.png'
import logo from '@/assets/518title.png'
import { windowOpen } from '@/utils'

const router = useRouter()
const globalStore = useGlobalDataStore()
const frontGlobal = useGlobalStore()

const dynamicLogo = computed(() => encodeURI(globalStore.system.logo ?? '') || logo)
const dynamicTop = computed(() => encodeURI(globalStore.system.top ?? '') || bg)

console.log(dynamicLogo.value, dynamicTop.value)
const topLinkList = computed(() => frontGlobal.homeData.topLink || [])

function jumpToBackground() {
  router.push({ name: 'permissionManage' })
}

function handleOuterLink(item) {
  // Api.doCount({ id: item.links[0].id })
  windowOpen(item.url)
}
</script>

<template>
  <div class="w-full bg-no-repeat bg-cover c-white bg-white" :style="{ backgroundImage: `url(${dynamicTop})` }">
    <div class="h-170  text-main relative">
      <div class="content mx-auto flex justify-between items-center h-full w-1280 relative">
        <div class="absolute right-0 top-15px w-600px flex items-center justify-end">
          <div
            v-for="linkItem in topLinkList" :key="linkItem.id"
            class="text-white h-16px cp inline-block max-w-fit mr-30px"
            @click="handleOuterLink(linkItem)"
          >
            <div class="flex items-center h-full">
              <img :src="linkItem.icon" class="h-full object-cover" alt="">
              <div class="ml-8px">{{ linkItem.title }}</div>
            </div>
          </div>
          <div
            un-border="1px white" un-text="white"
            class="px-8px py-4px rounded-16px p-4 cp w-fit inline-block"
            @click="jumpToBackground"
          >
            <div class="flex items-center">
              后台管理
            </div>
          </div>
        </div>
        <div class="flex items-center cp" @click="router.push('/home')">
          <img class="h-100 object-cover" :src="dynamicLogo" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
@keyframes scan {
  0% {
    background-size: 0 100%;
  }

  100% {
    background-size: 100% 100%;
  }
}
.gradient {
  background-image: linear-gradient(#BBFFF7, #FFF);
}
.span-style > span {
  border-radius: 6px;
  @apply w-45% h-1/4 flex items-center justify-center border-1px border-main;
}
.span-style > span:hover {
  @apply border-white bg-main text-white;
  transition: all 0.4s;
  cursor: pointer;
}

.font-family-config {
  font-family: 'REEJI-HonghuangLiGB'
}

::v-deep(.p .el-input__inner) {
  width: 300px;
  height: 40px !important;
  border-radius: 4px !important;
  border: 1px solid #e5e5e5 !important;
}

.text {
  background: white -webkit-linear-gradient(left, #FF0000, #FF0000) no-repeat 0 0;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-size: 0 100%;
}

.load {
  background-size: 100% 100%;
  animation: scan 9s linear 0s infinite;
}
</style>
