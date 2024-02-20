<script setup lang="ts">
const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '请输入您要搜索的内容',
  },
})

const emits = defineEmits(['input', 'search'])
const inputVal = ref(props.value)

watch(() => props.value, (val) => {
  inputVal.value = val
})

watch(() => inputVal.value, (val) => {
  emits('input', val)
})

async function search() {
  await nextTick()
  emits('search', inputVal.value)
}
</script>

<template>
  <div class="fr cf h-44 overflow-hidden my-8 bg-#EDEDED mr20 rounded-35 overflow-hidden">
    <div class="fl h-full text-center leading-44 p-x-10">
      <i class="el-icon-search c-#ccc"></i>
    </div>
    <el-input
      v-model="inputVal" :placeholder="placeholder"
      class="fl !w-300 h-full ![&_.el-input\_\_inner]:bg-#EDEDED ![&_.el-input\_\_inner]:border-none ![&_.el-input\_\_inner]:h44 ![&_.el-input\_\_inner]:rounded-0"
      clearable @keyup.enter="search" @clear="search"
    >
    </el-input>
    <div class="w70 bg-#DA2027 fl h-44 text-center leading-44 c-white cp" @click="search">
      搜索
    </div>
  </div>
</template>

<style lang='scss' scoped></style>
