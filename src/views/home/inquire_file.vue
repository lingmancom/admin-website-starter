<script setup lang="ts">
import IContainer from './components/IContainer.vue'
import no1 from '@/assets/images/i_box_file.png'
import type { colConfig } from '@/components/eTable/eTableUtils'
import { setColsConfig } from '@/components/eTable/eTableUtils'
import { previewFile } from '@/composables/preview'

// const cur = reactive({} as any)
const year = ref('')
const table = useCRUDVariable({
  item: {},
  getParams: { year },
  getApiFn: APIArchive.getFileArchiveList,
  requestPageSettings: { pageSize: 10 },
})

// const list = ref([])

const tableColumnConfig: colConfig[] = setColsConfig([
  { prop: 'archiveUnit', label: '发文单位', width: 240 },
  { prop: 'title', label: '文件标题', showOverflowTooltip: true as any },
  // { prop: 'gender', label: '发文日期' },
  // { prop: 'ethnicity', label: '发文编号' },
  { prop: 'textCode', label: '发文编号', width: 300 },
  { prop: 'receiptTime', label: '发文日期', width: 200 },
  // { prop: 'attachNum', label: '附件数量', width: 120 },
  { prop: 'address', label: '存放位置', width: 120 },
  { label: '操作', prop: 'operation', fixed: 'right', width: 160 },
], { align: 'center' })

table.loadData()

// async function loadData() {
//   const res = await APIArchive.getFileArchiveItem({ id: cur.id })
//   list.value = res
// }

// watch(dialogVisible, (val) => {
//   if (val)
//     loadData()
// })

// #region 变量
const archiveRecordYear = ref([])// 年份下拉框的数据
// #endregion 变量

// #region 归档记录年份
APIArchive.getFileArchiveAllYear().then((res) => {
  archiveRecordYear.value = res
})
// #endregion 归档记录年份

function handleCommand(command: string | number | object) {
  year.value = command as string
  table.loadData()
}
</script>

<template>
  <IContainer title="个人档案查询">
    <template #title>
      <img src="@/assets/images/t_wenjian.png" alt="" class="mt-30">
    </template>
    <div class="flex flex-col h-full gap-20">
      <div class="flex justify-center">
        <div class="w-800 h-70 bg-#001067 rounded-10 b b-#16F5FF shadow-[0_0_20px_#16F5FF] fc text-30 pl-30">
          <el-dropdown trigger="click" class="cp" @command="handleCommand">
            <div class="fc c-white text-30 fwbold">
              <div class="w-100 fc">{{ year ? `${year}年` : '全部' }}</div> <span
                class="i-ic-twotone-arrow-drop-down text-40"
              ></span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-scrollbar wrap-class="scrollbar" class="h-200!" style="--el-font-size-base: 18px">
                  <el-dropdown-item command="">全部</el-dropdown-item>
                  <el-dropdown-item v-for="(item, index) in archiveRecordYear" :key="index" :command="item">
                    {{ item }}
                  </el-dropdown-item>
                </el-scrollbar>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <input
            v-model="table.requestPageSettings.q" type="text"
            class="flex-1 w-0 h-full bg-transparent text-white text-30 outline-none" placeholder="请输入关键词搜索"
          >
          <div
            v-if="table.requestPageSettings.q" class="i-ic-baseline-cancel text-30 mx-10"
            @click="table.requestPageSettings.q = '', table.loadData()"
          ></div>
        </div>
        <div class="fc ml-40 px-50 h-70 rounded-10 text-30 fwbold bg-red text-white cp" @click="table.loadData()">
          查 询
        </div>
      </div>
      <div
        class="w-full flex flex-1 flex-col p-40 bg-no-repeat bg-[length:100%_100%] h-0"
        :style="{ backgroundImage: `url(${no1})` }"
      >
        <ETable
          class="flex-1 h-0 bg-transparent!" row-class-name="bg-transparent! h-60 c-white text-20"
          header-row-class-name="bg-transparent! h-60 c-white text-20"
          :header-cell-style="{ backgroundColor: 'transparent !important' }" :data="table.tableData.value"
          :table-column-config="tableColumnConfig" @selection-change="table.handleSelectionChange"
        >
          <template #operation="{ row }">
            <div>
              <el-button type="primary" size="large" @click="previewFile(row.fileVms?.[0])">
                查看
              </el-button>
            </div>
          </template>
        </ETable>

        <div class="flex justify-center mt-20px">
          <el-pagination
            v-model:current-page="table.requestPageSettings.pageNumber"
            style="--el-color-primary: #F96352; --el-disabled-bg-color: #0067AE; --el-text-color-placeholder: #ffffff; --el-text-color-regular: #ffffff; --el-pagination-font-size: 16px;"
            :page-size="table.requestPageSettings.pageSize" layout="total, prev, pager, next, jumper" prev-text="上一页"
            next-text="下一页" :total="table.requestPageSettings.totalCount" background
            @current-change="table.handleCurrentChange"
          />
        </div>
        <!-- <el-dialog v-model="dialogVisible" destroy-on-close :close-on-click-modal="true" width="60%">
          <template #header>
            <div class="cf">
              <div class="fl h19 leading-16 text-20 ml-10 fwbold c-black">
                {{ cur.title }}
              </div>
            </div>
          </template>
          <el-scrollbar wrap-class="scrollbar" style="height: 70vh;">
            <AList class="mt-36" :data="list"></AList>
          </el-scrollbar>
        </el-dialog> -->
      </div>
    </div>
  </IContainer>
</template>

<style lang="scss" scoped>
:deep(.el-table) {

  --el-table-row-hover-bg-color: var(--el-transfer-border-color);
}

:deep(.el-input__inner) {
  color: black !important;
}
</style>
