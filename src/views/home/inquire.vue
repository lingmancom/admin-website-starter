<script setup lang="ts">
import IContainer from './components/IContainer.vue'

import EOne from './components/EOne.vue'
import EBOne from './components/EBOne.vue'
import EBTwo from './components/EBTwo.vue'
import EBThree from './components/EBThree.vue'
import EFour from './components/EFour.vue'

import no1 from '@/assets/images/i_box1.png'
import no2 from '@/assets/images/i_box2.png'

import { historyList } from '@/composables/history'

const router = useRouter()

const educationalLevel = ref({} as any)
const militaryServiceStatus = ref({} as any)
const politicalOutlook = ref({} as any)
const natureOfWorkUnit = ref({} as any)
const archivalData = ref({} as any) // 文件档案统计数据

async function loadData() {
  APIProfile.getStatistics({}).then((res) => {
    educationalLevel.value = JSON.parse(res.statisticalConfiguration.educationalLevel || '{}')
    console.log('eee', educationalLevel.value)
    console.log('aaa', res.archiveStatistics)

    militaryServiceStatus.value = JSON.parse(res.statisticalConfiguration.militaryServiceStatus || '{}')
    politicalOutlook.value = JSON.parse(res.statisticalConfiguration.politicalOutlook || '{}')
    natureOfWorkUnit.value = JSON.parse(res.statisticalConfiguration.natureOfWorkUnit || '{}')
    archivalData.value = res.archiveStatistics
  })
}

loadData()
</script>

<template>
  <IContainer title="电子档案查询系统">
    <template #title>
      <img src="@/assets/images/t_dianzi.png" alt="" class="mt-30">
    </template>
    <div class="w-full flex flex-4/10">
      <div
        class="flex-1/3 bg-no-repeat bg-[length:100%_100%] h-full p-40 flex flex-col"
        :style="{ backgroundImage: `url(${no1})` }"
      >
        <div class="flex items-center">
          <div class="fwbold text-20">档案查询</div>
          <img class="ml-20" src="@/assets/images/i_icon.png" alt="">
        </div>
        <div class="flex-1 h-0 w-full flex justify-around items-center">
          <!-- <img src="@/assets/images/i_w.png" class="w-380 h-290 cp" alt="" @click="router.push({ name: 'inquire_file', query: { type: '档案查询' } })"> -->
          <img
            src="@/assets/images/i_r.png" class="w-460 h-290 cp" alt=""
            @click="router.push({ name: 'inquire_self', query: { type: '档案查询' } }), historyList.push('inquire')"
          >
        </div>
      </div>
      <div class="w-20"></div>
      <div
        class="flex-2/3 bg-no-repeat bg-[length:100%_100%] h-full p-40 flex flex-col"
        :style="{ backgroundImage: `url(${no2})` }"
      >
        <!-- <div class="flex items-center">
          <div class="fwbold text-20">工作单位性质</div>
          <img class="ml-20" src="@/assets/images/i_icon.png" alt="">
        </div> -->
        <!-- <EOne :nature-of-work-unit="natureOfWorkUnit" class="flex-1 h-0 mt-20"></EOne> -->

        <el-carousel class="h-full [&_.el-carousel\_\_container]:h-full " indicator-position="none" arrow="always">
          <el-carousel-item class="h-full flex! flex-col">
            <div class="flex items-center">
              <div class="fwbold text-20">工作单位性质</div>
              <img class="ml-20" src="@/assets/images/i_icon.png" alt="">
            </div>
            <EOne :nature-of-work-unit="natureOfWorkUnit" class="flex-1 h-0 mt-20"></EOne>
          </el-carousel-item>
          <!-- <el-carousel-item class="h-full flex! flex-col">
            <div class="flex items-center">
              <div class="fwbold text-20">文件档案统计</div>
              <img class="ml-20" src="@/assets/images/i_icon.png" alt="">
            </div>
            <EFour :archival-data="archivalData" class="flex-1 h-0 mt-20"></EFour>
          </el-carousel-item> -->
        </el-carousel>
      </div>
    </div>
    <div class="w-full flex  flex-6/100">
      <div
        class="flex-1/3 bg-no-repeat bg-[length:100%_100%] h-420 p-40 flex flex-col"
        :style="{ backgroundImage: `url(${no1})` }"
      >
        <div class="flex items-center">
          <div class="fwbold text-20">文化程度</div>
          <img class="ml-20" src="@/assets/images/i_icon.png" alt="">
        </div>
        <EBOne :educational-level="educationalLevel" class="flex-1 h-0 mt-20"></EBOne>
      </div>
      <div class="w-20"></div>
      <div class="flex-2/3 flex">
        <div
          class="flex-1 bg-no-repeat bg-[length:100%_100%] h-420 p-40 flex flex-col"
          :style="{ backgroundImage: `url(${no1})` }"
        >
          <div class="flex items-center">
            <div class="fwbold text-20">政治面貌</div>
            <img class="ml-20" src="@/assets/images/i_icon.png" alt="">
          </div>
          <EBTwo :political-outlook="politicalOutlook" class="flex-1 h-0 mt-20"></EBTwo>
        </div>
        <div class="w-20"></div>
        <div
          class="flex-1 bg-no-repeat bg-[length:100%_100%] h-420 p-40 flex flex-col"
          :style="{ backgroundImage: `url(${no1})` }"
        >
          <div class="flex items-center">
            <div class="fwbold text-20">服兵役情况</div>
            <img class="ml-20" src="@/assets/images/i_icon.png" alt="">
          </div>
          <EBThree :military-service-status="militaryServiceStatus" class="flex-1 h-0 mt-20"></EBThree>
        </div>
      </div>
    </div>
  </IContainer>
</template>

<style lang="scss" scoped>
.t8 {
  // 上下运动的动画
  animation: animate 8s ease-in-out infinite;
}

.t7 {
  // 上下运动的动画
  animation: animate 7s ease-in-out infinite;
}

.t5 {
  // 上下运动的动画
  animation: animate 5s ease-in-out infinite;
}

.t6 {
  // 上下运动的动画
  animation: animate 6s ease-in-out infinite;
}

// 动画
@keyframes animate {

  0%,
  100% {
    transform: translateY(-18px);
  }

  50% {
    transform: translateY(18px);
  }
}

// @import "./index.scss";
.dataScreen-container {
  width: 100%;
  height: 100%;
  background: url("@/assets/images/screen1_bg.png") no-repeat;
  // background-color: #11144E;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: 100% 100%;
  background-size: cover;

  .dataScreen {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 999;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.3s;
    transform-origin: left top;

    .dataScreen-header {
      display: flex;
      width: 100%;
      height: 120px;
      background-image: url('@/assets/images/s_header_bg.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;

      .header-lf,
      .header-rg {
        position: relative;
        width: 567px;
        height: 100%;
        // background: url("./images/dataScreen-header-left-bg.png") no-repeat;
        // background-size: 100% 100%;
      }

      .header-ct {
        position: relative;
        flex: 1;
        height: 100%;

        .header-ct-title {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 83px;
          font-family: YouSheBiaoTiHei;
          font-size: 42px;
          font-weight: bold;
          line-height: 80px;
          text-align: center;
          letter-spacing: 4px;
          // background: url("./images/dataScreen-header-center-bg.png") no-repeat;
          // background-size: 100% 100%;
        }
      }

      .header-time {
        position: absolute;
        top: 0;
        right: 20px;
        font-family: YouSheBiaoTiHei;
        font-size: 28px;
        font-weight: 600;
        white-space: nowrap;
      }
    }

  }
}

::v-deep(.el-carousel__arrow--left) {
  left: 0;
}

::v-deep(.el-carousel__arrow--right) {
  right: 0;
}
</style>
