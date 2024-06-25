<script setup lang="ts">
import IContainer from './components/IContainer.vue'
import ERadar from './components/ERadar.vue'
import no1 from '@/assets/images/i_s_box1.png'
import no2 from '@/assets/images/i_s_box2.png'
import infoBg from '@/assets/images/i_info_bg.png'

const route = useRoute()

const id = route.query.id as string

const pageData = reactive({} as any)
const withId = ref('')

async function loadData() {
  const res = await APIProfile.getProfileClassificationList({ id })
  Object.assign(pageData, res, {
    // 身份证号脱敏 只看前四位和后四位
    idCard: res.idCard.replace(/(\d{4})\d+(\d{4})/, '$1********$2'),
  })
  if (!withId.value) withId.value = res.categoryList[0].id
}

loadData()

const fileList = ref([] as any[])

async function loadDetail() {
  const res = await APIProfile.getProfileItemDetail({ withId: withId.value })
  fileList.value = res
}

watch(withId, () => {
  loadDetail()
})
</script>

<template>
  <IContainer title="个人档案查询">
    <template #title>
      <img src="@/assets/images/t_geren.png" alt="" class="mt-30">
    </template>
    <div class="flex h-full gap-20">
      <div
        class="w-560 flex flex-col p-40 bg-no-repeat bg-[length:100%_100%]"
        :style="{ backgroundImage: `url(${no1})` }"
      >
        <div class="flex items-center">
          <div class="fwbold text-20">基础信息</div>
          <img class="ml-20" src="@/assets/images/i_icon.png" alt="">
        </div>
        <div
          class="mt-30 flex w-full h-200 bg-no-repeat bg-[length:100%_100%] p-20"
          :style="{ backgroundImage: `url(${infoBg})` }"
        >
          <img v-if="pageData.photoUrl" :src="pageData.photoUrl" alt="" class="w-120 h-156 object-cover">
          <img v-else src="@/assets/images/h_empty.png" alt="" class="w-120 h-156">
          <div class="flex flex-col justify-between ml-20 py-20 text-18">
            <div class="">姓名：{{ pageData.name }}</div>
            <div class="">身份证号：{{ pageData.idCard }}</div>
            <div class="">单位：{{ pageData.unitName }}</div>
          </div>
        </div>
        <ERadar class="mt-20 w-full flex-1" :category-list="pageData.categoryList"></ERadar>
      </div>
      <div class="flex-1 p-40 bg-no-repeat bg-[length:100%_100%]" :style="{ backgroundImage: `url(${no2})` }">
        <div class="grid grid-cols-3 gap-20">
          <div
            v-for="i, idx in pageData.categoryList" :key="idx" class="h-90 bg-#001067 rounded-10 b b-#16F5FF shadow-[0_0_20px_#16F5FF] fc text-24 p-10 cp" :class="withId === i.id ? 'bg-red' : ''"
            @click="withId = i.id"
          >
            {{ i.name }} ({{ i.count }})
          </div>
        </div>
        <AList class="mt-36" :data="fileList.map(i => ({ ...i, title: i.name, cover: pageData.categoryList.find(c => c.id === i.withId)?.cover }))"></AList>
      </div>
    </div>
  </IContainer>
</template>
