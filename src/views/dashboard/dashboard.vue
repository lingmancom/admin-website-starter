<script setup lang="ts">
import { init } from 'echarts'
import { windowOpen } from '@/utils'
import { useUserStore } from '@/store/modules/user'

import { DoorMeta } from '@/config'

const router = useRouter()

const mounthChart = ref()
const visits = ref()

const { userInfo } = useUserStore()
console.log('userInfo', userInfo)

// 定义参数接受getWorkbenchInfo返回的数据
let workbenchInfo = reactive({
  numofperfiles: 0, // 个人档案数
  numoffiles: 0, // 文件档案数
  archives: 0, // 待归还档案
  borrowingStatistics: {}, // 档案借阅统计
  archiveStatistics: {}, // 文件档案统计
})

/**
 * @description 获取统计的接口数据
 */
APIDashboard.getWorkbenchInfo().then((res) => {
  workbenchInfo = Object.assign(workbenchInfo, res)
  nextTick(() => {
    initPriceChart()
    initVisits()
  })
})

onMounted(() => {

})

// 档案借阅统计
function initPriceChart() {
  const chartDom = mounthChart.value
  const myChart = init(chartDom as any)

  const option = {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: Object.keys(workbenchInfo.borrowingStatistics).map((item: any) => `${item}月`),
      axisLabel: {
        fontSize: 16,
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        // name: '档案借阅统计',
        data: Object.values(workbenchInfo.borrowingStatistics),
        type: 'line',
        smooth: true,
        itemStyle: {
          normal: {
            label: { show: true },
          },
          symbolSize: 10,
        },
        markArea: {
        },
      },
    ],
  }

  option && myChart.setOption(option)
}

// 文件档案统计
function initVisits() {
  const chartDom = visits.value
  const myChart = init(chartDom as any)
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: Object.keys(workbenchInfo.archiveStatistics),
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          fontSize: 16,
        },
      },
    ],
    yAxis: [
      { type: 'value' },
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: Object.values(workbenchInfo.archiveStatistics),
      },
    ],
  }

  option && myChart.setOption(option)
}

function handleJump(path: string) {
  if (path === 'file-archive' && userInfo.file)
    router.push({ name: 'file-archive' })
  else if (path === 'profile' && userInfo.profile)
    router.push({ name: 'profile' })
  else if (path === 'open' && userInfo.openDoor)
    ElMessage.success('开门成功')
  else if (path === 'close' && userInfo.openDoor)
    ElMessage.success('关门成功')
  else
    ElMessage.error('暂无权限')
}

async function handleDoor(action: DoorMeta, number) {
  if (userInfo.openDoor) {
    if (action === DoorMeta.开门)

      openDoor(number)

    if (action === DoorMeta.关门)
      closeDoor(number)
  }
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="flex h-150">
      <el-card class="flex-7/10" body-class="w-full h-full flex items-center justify-around">
        <div class="flex">
          <img src="@/assets/images/d_wenjian.png" alt="" class="w-50 h-50">
          <div class="flex flex-col justify-between ml-10 py-2">
            <div class="text-24 fwbold c-#005CEC">{{ workbenchInfo.numoffiles }}</div>
            <div class="c-#999999 text-14">文件档案数</div>
          </div>
        </div>
        <div class="w-1 h-50 bg-#999999"></div>
        <div class="flex">
          <img src="@/assets/images/d_geren.png" alt="" class="w-50 h-50">
          <div class="flex flex-col justify-between ml-10 py-2">
            <div class="text-24 fwbold c-#EA4050">{{ workbenchInfo.numofperfiles }}</div>
            <div class="c-#999999 text-14">个人档案数</div>
          </div>
        </div>
        <div class="w-1 h-50 bg-#999999"></div>
        <div class="flex">
          <img src="@/assets/images/d_wait.png" alt="" class="w-50 h-50">
          <div class="flex flex-col justify-between ml-10 py-2">
            <div class="text-24 fwbold c-#F2BD42">{{ workbenchInfo.archives }}</div>
            <div class="c-#999999 text-14">待归还档案</div>
          </div>
        </div>
      </el-card>
      <div class="w-12"></div>
      <el-card class="flex-3/10" body-class="w-full h-full">
        <div>快捷方式</div>
        <div class="flex justify-around items-center mt-10">
          <div class="flex flex-col items-center cp" @click="handleJump('file-archive')">
            <!-- router.push({ name: 'file-archive' }) -->
            <img src="@/assets/images/k_wenjian.png" alt="" class="w-50 h-50">
            <div class="mt-10">文件档案</div>
          </div>
          <div class="flex flex-col items-center cp" @click="handleJump('profile')">
            <!-- router.push({ name: 'profile' }) -->
            <img src="@/assets/images/k_geren.png" alt="" class="w-50 h-50">
            <div class="mt-10">个人档案</div>
          </div>
          <div class="flex flex-col items-center cp" @click="windowOpen('/home')">
            <img src="@/assets/images/k_yonhu.png" alt="" class="w-50 h-50">
            <div class="mt-10">触屏端</div>
          </div>
        </div>
      </el-card>
    </div>

    <el-card class="w-full h-300 mt-14" body-class="flex items-center justify-around">
      <div class="flex">
        <img src="@/assets/images/g_box.png" alt="" class="w-220 h-260">
        <div class="flex flex-col justify-around ml-10 py-2">
          <div class="text-24 fwbold">一号柜</div>
          <div class="flex items-center c-#51C41B">
            <div class="w-16 h-16 rounded-8 bg-#51C41B"></div>
            <div class="ml-8 leading-16">已连接</div>
          </div>
          <div class="c-#999999 text-14">
            <el-button type="primary" @click="handleDoor(DoorMeta.开门, '01')">开门</el-button>
            <el-button @click="handleDoor(DoorMeta.关门, '01')">关门</el-button>
          </div>
        </div>
      </div>
      <div class="flex">
        <img src="@/assets/images/g_box.png" alt="" class="w-220 h-260">
        <div class="flex flex-col justify-around ml-10 py-2">
          <div class="text-24 fwbold">二号柜</div>
          <!-- <div class="flex items-center c-#EA4050">
            <div class="w-16 h-16 rounded-8 bg-#EA4050"></div>
            <div class="ml-8 leading-16">已断开</div>
          </div> -->
          <div class="flex items-center c-#51C41B">
            <div class="w-16 h-16 rounded-8 bg-#51C41B"></div>
            <div class="ml-8 leading-16">已连接</div>
          </div>
          <div class="c-#999999 text-14">
            <el-button type="primary" @click="handleDoor(DoorMeta.开门, '02')">开门</el-button>
            <el-button @click="handleDoor(DoorMeta.关门, '02')">关门</el-button>
          </div>
        </div>
      </div>
      <div class="flex">
        <img src="@/assets/images/g_box.png" alt="" class="w-220 h-260">
        <div class="flex flex-col justify-around ml-10 py-2">
          <div class="text-24 fwbold">三号柜</div>
          <div class="flex items-center c-#51C41B">
            <div class="w-16 h-16 rounded-8 bg-#51C41B"></div>
            <div class="ml-8 leading-16">已连接</div>
          </div>
          <div class="c-#999999 text-14">
            <el-button type="primary" @click="handleDoor(DoorMeta.开门, '03')">开门</el-button>
            <el-button @click="handleDoor(DoorMeta.关门, '03')">关门</el-button>
          </div>
        </div>
      </div>
    </el-card>

    <div class="flex w-full flex-1 mt-16">
      <el-card class="flex-1 mr-16" body-class="h-full flex flex-col">
        <div class="flex justify-between">
          <div>文件档案统计</div>
        </div>
        <div ref="visits" class="w-full flex-1 h-0" />
      </el-card>
      <el-card class="flex-1" body-class="h-full flex flex-col">
        <!-- <div>档案借阅统计</div> -->
        <div class="flex justify-between">
          <div>档案借阅统计</div>
        </div>
        <div ref="mounthChart" class="w-full flex-1 h-0" />
      </el-card>
    </div>
  </div>
</template>

<style lang='scss' scoped></style>
