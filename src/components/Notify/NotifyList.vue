<script lang="ts" setup>
import { MessageTypeMeta } from '@/config'

const props = defineProps<Props>()

const router = useRouter()

interface Props {
  list: any[]
}

function handelClick(i) {
  if (i)
    return
  if (i.kind === MessageTypeMeta.计算机相关)
    return router.push('')
  if (i.kind === MessageTypeMeta.计算机相关)
    return router.push('')
}
</script>

<template>
  <el-empty v-if="props.list.length === 0" />
  <el-card
    v-for="(item, index) in props.list" v-else :key="index" shadow="never" class="card-container"
    :class="item.looked ? '!bg-gray200' : ''" @click="handelClick(item)"
  >
    <div class="card-header cp">
      <div>
        <span>
          <span class="card-title">{{ item.message }}</span>
          <el-tag v-if="item.extra" :type="item.status" effect="plain" size="small">{{ item.extra }}</el-tag>
        </span>
        <div class="card-time">
          {{ item.noticeTime }}
        </div>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.card-container {
  margin-bottom: 10px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .card-title {
      font-weight: bold;
      margin-right: 10px;
    }

    .card-time {
      font-size: 12px;
      color: grey;
    }

    .card-avatar {
      display: flex;
      align-items: center;
    }
  }

  .card-body {
    font-size: 12px;
  }
}
</style>
