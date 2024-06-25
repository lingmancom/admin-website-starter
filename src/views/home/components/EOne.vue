<script setup lang="ts">
import { init } from 'echarts'

const props = defineProps<{ natureOfWorkUnit: any }>()

const visits = ref()

watch(() => props.natureOfWorkUnit, () => {
  nextTick(() => {
    initVisits()
  })
})

const KeyMeta = {
  organization: '机关',
  socialOrganization: '社会组织',
  stateOwnedHoldingCompany: '国有控股企业',
  industrySystem: '行业系统',
  groupHoldingCompany: '集团控股企业',
  researchInstitute: '科研院所',
  nonPublicEnterprise: '非公企业',
  university: '高等学校',
  individualEconomy: '个体经济',
}

function initVisits() {
  const chartDom = visits.value
  const myChart = init(chartDom as any)
  const option = {
    tooltip: {
      // trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: Object.keys(KeyMeta).map(i => Object.keys(props.natureOfWorkUnit).includes(i) ? KeyMeta[i] : ''),
        axisLabel: {
          rotate: 45,
          textStyle: {
            color: '#ffffff',
            fontSize: 18,
          },
        },
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          textStyle: {
            color: '#ffffff',
          },
        },
      },
    ],
    series: [
      {
        name: '工作单位性质',
        type: 'bar',
        barWidth: '60%',
        color: '#00A0E9',
        data: Object.keys(KeyMeta).map(i => Object.keys(props.natureOfWorkUnit).includes(i) ? props.natureOfWorkUnit[i] : 0),
      },
    ],
  }

  option && myChart.setOption(option)
}
</script>

<template>
  <div ref="visits"></div>
</template>

<style lang='scss' scoped></style>
