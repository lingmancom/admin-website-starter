<script setup lang="ts">
import { init } from 'echarts'

const props = defineProps<{ archivalData: any }>()

const visits = ref()

watch(() => props.archivalData, () => {
  console.log('props.archivalData', props.archivalData)

  nextTick(() => {
    initVisits()
  })
})

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
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: Object.keys(props.archivalData),
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          rotate: 45,
          textStyle: {
            color: '#ffffff',
            fontSize: 18,
          },
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
        name: '文件档案统计',
        type: 'bar',
        barWidth: '60%',
        color: '#00A0E9',
        data: Object.values(props.archivalData),
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
