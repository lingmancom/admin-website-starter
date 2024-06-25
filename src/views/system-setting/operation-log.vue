<script setup lang="tsx">
import { setColsConfig } from '@/components/eTable/eTableUtils'
import { exportExcel } from '@/hooks/utils.ts'

const tableColumnConfig = setColsConfig([
  { prop: 'account', label: '账号' },
  { prop: 'name', label: '姓名' },
  { prop: 'ipAddress', label: 'IP地址' },
  { prop: 'module', label: '操作模块' },
  { prop: 'content', label: '操作内容' },
  { prop: 'createdAt', label: '操作时间' },
], { align: 'center' })

const table = useCRUDVariable({
  item: {},
  requestPageSettings: {
    pageSize: 14,
  },
  getApiFn: API_SYSTEM_SETTINGS.getOperationLogList,
})

table.loadData()
</script>

<template>
  <div class="clue w-full h-full">
    <el-card class="h-full flex flex-col" body-class="flex flex-col flex-grow">
      <template #header>
        <div class="flex justify-between items-center">
          <div class="text-18px font-bold">
            操作日志
          </div>
          <div>
            <el-input
              v-model="table.requestPageSettings.q" placeholder="请输入搜索内容" class="!w-300" clearable
              @clear="() => { table.requestPageSettings.pageNumber = 1; table.loadData() }"
              @keyup.enter="() => { table.requestPageSettings.pageNumber = 1; table.loadData() }"
            >
              <template #append>
                <el-button @click="() => { table.requestPageSettings.pageNumber = 1; table.loadData() }">
                  搜索
                </el-button>
              </template>
            </el-input>
          </div>
          <div>
            <el-button
              type="primary"
              @click="exportExcel(
                '操作日志',
                '/api/admin/log/exportExcel',
                { q: table.requestPageSettings.q },
              )"
            >
              导出
            </el-button>
          </div>
        </div>
      </template>
      <div class="flex flex-col justify-between flex-grow">
        <ETable :data="table.tableData.value" :table-column-config="tableColumnConfig" @selection-change="table.handleSelectionChange">
          <template #operation>
            <div>
              <el-button type="primary">编辑</el-button>
            </div>
          </template>
        </ETable>

        <div class="flex justify-center ">
          <el-pagination
            v-model:current-page="table.requestPageSettings.pageNumber"
            :page-size="table.requestPageSettings.pageSize" layout="total, prev, pager, next, jumper" prev-text="上一页"
            next-text="下一页" :total="table.requestPageSettings.totalCount" background
            @current-change="table.handleCurrentChange"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>
