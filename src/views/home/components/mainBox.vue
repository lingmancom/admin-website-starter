<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const pathList: {
  title: string
  name?: string
  path?: string
}[] = [
  { title: '首页', name: 'home' },
]

const current = ref(pathList.find(i => route.name === i.name || route.path === i.path) || pathList[0])

const keyword = ref(route.query.keyword1 as string || '')

watch(() => route.path, () => {
  current.value = pathList.find(i => route.name === i.name || route.path === i.path) || current.value
})

function search() {
  router.push(`/article-search?keyword1=${keyword.value}`)
}
</script>

<template>
  <div>
    <HeaderBox></HeaderBox>
    <div class="h-60  bg-main text-20 text-white">
      <div class="mx-auto h-full w-1280 flex justify-between items-center">
        <div class="title flex flex-nowrap justify-around items-center h-full w-800 [&>div]:cp">
          <div
            v-for="i, idx in pathList" :key="idx" :router="i.name" :class="current.title === i.title ? 'active' : ''"
            @click="current = i, router.push(i)"
          >
            {{ i.title }}
          </div>
        </div>
        <div class="search h-36px w-290">
          <el-input
            v-model="keyword" clearable class="h-full w-full
            ![&_.el-input-group\_\_append]:bg-transparent
            ![&_.el-input-group\_\_append]:shadow-none
            ![&_.el-input-group\_\_append]:p-0" placeholder="请输入关键词搜索"
            @clear="route.path.startsWith('/article-search') && router.push({ name: current.name })" @keydown.enter="search"
          >
            <template #prefix>
              <el-icon>
                <Search />
              </el-icon>
            </template>
            <template #append>
              <div class="bg-#ea4050 h-36px leading-36px w-78px rounded-4px cp" un-text="white center" @click="search">搜索</div>
            </template>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.search {
  transform: translateX(-10%)
}

.title {
  @apply relative;

  div {
    @apply flex items-center h-full relative;
  }

  div.active {
    @apply text-yellow-200 font-600;
  }

  div.active::after {
    content: '';
    left: 50%;
    transform: translateX(-50%);
    @apply absolute bottom-0;
    @apply border-10px border-l-transparent border-r-transparent border-t-transparent border-b-white;
  }
}
</style>
