<script setup lang="ts">
import { init } from 'echarts'

const props = defineProps<{ politicalOutlook: any }>()

const visits = ref()

watch(() => props.politicalOutlook, () => {
  nextTick(() => {
    initVisits()
  })
})

// console.log('props11111', props.politicalOutlook.cpcMember)

function initVisits() {
  const chartDom = visits.value
  const myChart = init(chartDom as any)
  const option = {
    tooltip: {
      // trigger: 'item',
    },
    legend: {
      top: '30%',
      right: 'right',
      icon: 'circle',
      textStyle: {
        color: '#ffffff',
      },
    },
    series: [
      {
        name: '政治面貌',
        type: 'pie',
        center: ['40%', '50%'],
        // radius: ['100%', '80%'],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          color: '#fff',
          formatter: '{b} \n{c}',
          fontSize: 15,
        },
        data: [
          { value: props.politicalOutlook.cpcMember, name: '中共党员' },
          { value: props.politicalOutlook.cpcProbationaryMember, name: '预备党员' },
          { value: props.politicalOutlook.cylMember, name: '共青团员' },
          { value: props.politicalOutlook.democraticPartyMember, name: '民主党派' },
          { value: props.politicalOutlook.mass, name: '群众' },
          { value: props.politicalOutlook.other, name: '其他' },
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
