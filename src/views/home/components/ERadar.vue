<script setup lang="ts">
import { init } from 'echarts'
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  categoryList: any
}>(), {
})
const categoryList = computed(() => props.categoryList)
const category = [
  {
    name: '政治面貌', // 入党团志愿书或党团组织关系介绍信等有关凭证或者复印件
    id: '30c9b0966695add002d3bafc4e69d15b',
  },
  {
    name: '体格情况', // 体格检查表或健康证明
    id: '2123eba375e3d1d914b8c19bc1de3385',
  },
  {
    name: '训练情况', // 历年训练考核成绩登记表
    id: '0dc78b0cb088cc813255956adb68e4e1',
  },
  {
    name: '专业技能情况', // 专业技能考核表
    id: '65810ac555a8d5d467541f2ec99d506e',
  },
  {
    name: '服役情况', // 推出现役军人证书
    id: '4cda1e0f98ff7de2dd07caea35342349',
  },
]

const radarRef = ref()

onMounted(() => {
  nextTick(() => {
    initVisits()
  })
})
watch(() => props.categoryList, () => {
  nextTick(() => {
    initVisits()
  })
})

function initVisits() {
  const chartDom = radarRef.value
  const myChart = init(chartDom as any)
  const dataValue = category.map((cate) => {
    //  如果大于 0 为 1（图形顶满） 否则为 3（图形一半）
    return categoryList.value?.find(item => item.categoryId === cate.id)?.count > 0 ? 1 : 3
  }) // 数据

  const option = {
    // legend: {
    //   data: ['数据'],
    //   top: 'bottom',
    //   textStyle: {
    //     color: '#ffffff',
    //     fontSize: 16,
    //   },
    // },
    // tooltip: {},
    radar: {
      // shape: 'circle',
      indicator: category,
      name: { // 修改indicator文字的颜色
        textStyle: {
          color: '#ffffff',
          fontSize: 16,
          padding: [-10, -12], // 控制文字padding
        },
      },
      splitLine: {
        lineStyle: {
          width: 2,
          color: '#5087ec',
        },
      },
    },
    center: ['50%', '100%'],
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        symbolSize: 0, // 线段之间的点
        areaStyle: {
          normal: {
            shadowBlur: 13,
            shadowColor: 'rgba(0,0,0,.2)',
            shadowOffsetX: 0,
            shadowOffsetY: 10,
            opacity: 0.9,
          },
        },
        color: ['#d95040'],
        data: [
          {
            value: dataValue,
            // value: [1, 1, 1, 1, 3],
            name: '数据',
          },
        ],
      },
    ],
  }

  option && myChart.setOption(option)
}
</script>

<template>
  <div ref="radarRef"></div>
</template>

<style lang='scss' scoped></style>
