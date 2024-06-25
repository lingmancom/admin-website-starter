<script setup lang="ts">
import { init } from 'echarts'

const props = defineProps<{ militaryServiceStatus: any }>()

const visits = ref()

watch(() => props.militaryServiceStatus, () => {
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
        name: '服兵役情况',
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
        //   scale: false,
        // },
        label: {
          color: '#fff',
          formatter: '{b} \n{c}',
          fontSize: 15,
        },
        data: [
          { value: props.militaryServiceStatus.retiredMilitaryOfficer, name: '军政后退役军官' },
          { value: props.militaryServiceStatus.retiredSoldier, name: '退役士兵' },
          { value: props.militaryServiceStatus.retiredTechnicalCadre, name: '技术文职退役干部' },
          { value: props.militaryServiceStatus.retiredAdministrativeCadre, name: '行政文职退役干部' },
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
