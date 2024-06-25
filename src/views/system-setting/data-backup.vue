<script setup lang="ts">
import { type colConfig, setColsConfig } from '@/components/eTable/eTableUtils'

enum TypeEnum {
  Month = 'month',
  Day = 'today',
}
const type = ref(TypeEnum.Month)

const table = useCRUDVariable({
  getParams: {
    get kind() {
      return type.value
    },
  },
  getApiFn: API_SYSTEM_SETTINGS.getBackupList,
})

watch(type, () => table.loadData(), { immediate: true })

const tableColumnConfig: colConfig[] = setColsConfig([
  { prop: 'fileName', label: '备份名称' },
  { prop: 'fileSize', label: '数据大小' },
  { prop: 'fileDate', label: '备份时间' },
  { prop: 'operation', label: '操作' },
], { align: 'center' })

function doBackup() {
  API_SYSTEM_SETTINGS.dataBackup({
    kind: type.value,
  }).then(() => {
    ElMessage.success('备份成功')
  })
}
function exportData(row) {
  ElMessageBox.confirm('确定要下载吗？', '提示', { type: 'warning' }).then(async () => {
    const res = await service.get('/api/base/backups/download', { params: { kind: type.value, fileName: row.fileName }, responseType: 'blob' }) as Blob
    const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
    const downloadElement = document.createElement('a')
    const href = window.URL.createObjectURL(blob)
    downloadElement.href = href
    downloadElement.download = row.fileName
    document.body.appendChild(downloadElement)
    downloadElement.click()
    document.body.removeChild(downloadElement)
    window.URL.revokeObjectURL(href)
  })
}
</script>

<template>
  <div class="clue w-full h-full">
    <el-card class="h-full flex flex-col" body-class="flex flex-col flex-1 h-0">
      <template #header>
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-x-32px">
            <div class="text-18px font-bold">
              数据备份({{ table.tableData.value.length }})
            </div>
            <div>
              <el-radio-group v-model="type">
                <el-radio-button :value="TypeEnum.Month">按月备份</el-radio-button>
                <el-radio-button :value="TypeEnum.Day">按日备份</el-radio-button>
              </el-radio-group>
            </div>
          </div>

          <div>
            <el-button type="primary" @click="doBackup">手动备份</el-button>
          </div>
        </div>
      </template>
      <ETable
        class="flex-1 h-0"
        :loading="table.loading.value"
        :data="table.tableData.value"
        :table-column-config="tableColumnConfig"
      >
        <template #operation="{ row }">
          <el-button type="primary" @click="exportData(row)">下载</el-button>
        </template>
      </ETable>
      <div class="flex justify-center mt-10px">
        <el-pagination
          v-model:current-page="table.requestPageSettings.pageNumber" :page-size="table.requestPageSettings.pageSize"
          layout="total, prev, pager, next, jumper" prev-text="上一页" next-text="下一页" :total=" table.tableData.value.length "
          background @current-change="table.handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>
