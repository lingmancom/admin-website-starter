<script setup lang="ts">
import type { colConfig } from './eTableUtils'

defineProps<{
  loading?: boolean
  tableColumnConfig: colConfig[]
}>()

const tableRef = ref(null)
const options = reactive({} as any)

// onMounted(() => {
//   const entries = Object.entries(tableRef.value)
//   for (const [key, value] of entries)
//     options[key] = value
// })

// defineExpose(options)

const width = computed(() => (col) => {
  // 根据label的长度来设置宽度
  if (col.width)
    return col.width
  if (col.label)
    return `${50 + (col.label.length * 20)}px`
})

defineExpose({
  ...tableRef.value,
})

const slots = useSlots()
</script>

<template>
  <el-table
    ref="tableRef" v-loading="loading ?? false" tooltip-effect="dark" border style="width: 100%"
    v-bind="$attrs"
  >
    <el-table-column v-for="(col, idx) in tableColumnConfig" :key="idx" v-bind="col" :min-width="width(col)">
      <template v-if="Object.keys(slots).includes(col.prop)" #default="{ ...com }">
        <slot :name="col.prop" v-bind="com"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
