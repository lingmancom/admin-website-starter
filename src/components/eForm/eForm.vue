<script setup lang="ts">
import type { itemConfig } from './eFormUtils'

defineProps<{
  loading: boolean
  data: any[]
  itemsConfig: itemConfig[]
}>()

const tableRef = ref(null)

defineExpose({
  getSelectionRows: () => {
    return tableRef.value.getSelectionRows()
  },
})
</script>

<template>
  <el-form>
    <el-form-item
      v-for="item, idx in itemsConfig" :key="idx"
      :label="item.label" :prop="item.prop"
    ></el-form-item>
  </el-form>
</template>
