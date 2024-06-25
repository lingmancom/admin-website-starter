<script setup lang="ts">
import { init } from 'echarts'

const props = defineProps<{ educationalLevel: any }>()

const visits = ref()

watch(() => props.educationalLevel, () => {
  nextTick(() => {
    initVisits()
  })
})

function initVisits() {
  const chartDom = visits.value
  const myChart = init(chartDom as any)
  const option = {
    tooltip: {
      // show: false,
      // showContent: false,
    },
    legend: {
      top: '30%',
      right: 'right',
      icon: 'circle',
      textStyle: {
        color: '#ffffff',
      },
      formatter: (name) => {
        return `${name}`
      },
    },
    series: [
      {
        name: '文化程度',
        type: 'pie',
        center: ['40%', '50%'],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        // radius: ['100%', '80%'],
        // emphasis: {
        //   scale: true,
        // },
        label: {
          color: '#fff',
          formatter: '{b} \n{c}',
          fontSize: 15,
        },
        data: [
          { value: props.educationalLevel.universityAbove, name: '本科以上' },
          { value: props.educationalLevel.college, name: '大专（高职）' },
          { value: props.educationalLevel.highSchool, name: '高中' },
          { value: props.educationalLevel.middleSchool, name: '初中' },
        ],
      },
    ],
  }

  option && myChart.setOption(option)
}
</script>

<template>
  <div ref="visits"></div>
</template>

<style lang='scss' scoped>

</style>
