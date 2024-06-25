<script setup lang="ts" name="ElFormItem">
import { ElFormItem } from 'element-plus'

const props = defineProps<{
  rules?: Record<string, any>[]
  message?: string
}>()

const ruleList = ref(props.rules || [])

if (props.message) {
  ruleList.value = [
    {
      required: true,
      message: props.message,
      trigger: 'blur',
    },
    ...[ruleList.value].flat(Number.MAX_SAFE_INTEGER),
  ]
}

const slots = useSlots()

const elRef = ref()
const options = reactive({} as any)

onMounted(() => {
  const entries = Object.entries(elRef.value)
  for (const [key, value] of entries)
    options[key] = value
})

defineExpose(options)
</script>

<template>
  <ElFormItem v-bind="$attrs" ref="elRef" :rules="ruleList">
    <template v-for="(_, name) in slots" #[name]="slot">
      <slot :name="name" v-bind="slot" />
    </template>
  </ElFormItem>
</template>

<style lang='scss' scoped></style>
