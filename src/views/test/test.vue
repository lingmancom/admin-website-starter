<script setup lang="ts">
const visible = ref(false)
</script>

<template>
  <div class="w-100vw h-100vh">
    <el-button type="" @click="visible = true">打开</el-button>
    <el-dialog v-model="visible" title="title" width="600px">
      <PdfObject
        class="h-100vh"
        url="http://data:9000/p571/upload/1777542246096023554/eecb4a413434443fd4124a6d8284c952/out1-5.pdf"
        :options="{ page: 2 }"
      />
    </el-dialog>
  </div>
</template>

<style scoped>
/* 这里可以添加一些自定义样式 */
</style>
