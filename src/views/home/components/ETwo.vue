<script setup lang="ts">
import { init } from 'echarts'

const visits = ref()

onMounted(() => {
  nextTick(() => {
    initVisits()
  })
})

function initVisits() {
  const chartDom = visits.value
  const myChart = init(chartDom as any)
  const option = {
    tooltip: {
      show: false,
      showContent: false,
    },
    legend: {
      top: '30%',
      right: 'right',
      icon: 'circle',
      textStyle: {
        color: '#ffffff',
      },
      formatter: (name) => {
        return `${name} ${Math.floor(Math.random() * 500) + 50}`
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        center: ['34%', '50%'],
        radius: ['100%', '80%'],
        emphasis: {
          scale: false,
        },
        label: {
          show: true,
          position: 'center',
          color: '#ffffff',
          formatter: `{total|${800}}` + `\n\r` + `{active|月统计量}`,
          rich: {
            total: {
              fontSize: 35,
              fontFamily: '微软雅黑',
              color: '#ffffff',
            },
            active: {
              fontFamily: '微软雅黑',
              fontSize: 16,
              color: '#ffffff',
              lineHeight: 30,
            },
          },
        },
        data: [
          { value: 1048, name: '线索数量' },
          { value: 735, name: '信访数量' },
          { value: 580, name: '案件数量' },
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
