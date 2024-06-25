<script setup lang="ts">
import { Bell } from '@element-plus/icons-vue'
import IContainer from './components/IContainer.vue'
import no1 from '@/assets/images/i_r_box1.png'
import no2 from '@/assets/images/i_r_box2.png'

import { historyList } from '@/composables/history'

const router = useRouter()

const unitId = ref('')
const year = ref(parseTime(new Date(), '{y}') as string)

const table = useCRUDVariable({
  item: {},
  getParams: { unitId, status: 1, year, pageSize: 21 },
  getApiFn: APIProfile.getProfileList,
})

// 部门结构
const departmentTree = ref([] as any[])

// 树形图规则
const defaultProps = {
  children: 'children',
  label: 'name',
  value: 'id',
}

async function handleClickDepart(e) {
  unitId.value = e.id
}

watch(unitId, () => table.loadData(), { immediate: true })

// async function getDepartmentTree() {
//   departmentTree.value = await API_SYSTEM_SETTINGS.getAllDept()
// }

// getDepartmentTree()

// #region 变量
const archiveRecordYear = ref([])// 年份下拉框的数据
// #endregion 变量

// #region 归档记录年份
APIArchive.getArchiveRecordYearList().then((res) => {
  archiveRecordYear.value = res.sort((a, b) => b - a)
})
// #endregion 归档记录年份

function handleCommand(command: string | number | object) {
  year.value = command as string
  table.loadData()
  // getDepartmentTree()
}
// const selectedYear = ref(parseTime(Date.now(), '{y}')) // 归档记录年份下拉框选中的数据
watch(year, (v) => {
  console.log('selectedYear', v)
  console.log('是否当前年', v === parseTime(Date.now(), '{y}'))
  departmentTree.value = []
  if (v !== parseTime(Date.now(), '{y}')) {
    Api.getReturnArchiveUnitList(
      { year: v },
    ).then((res) => {
      departmentTree.value = res
    })
    // isCurrentYear.value = false
  }
  else {
    console.log('不是当年')
    Api.getUnitList().then((res) => {
      departmentTree.value = res
    })
    // isCurrentYear.value = true
  }
}, { immediate: true })
</script>

<template>
  <IContainer title="个人档案查询">
    <template #title>
      <img src="@/assets/images/t_geren.png" alt="" class="mt-30">
    </template>
    <div class="flex flex-col h-full gap-20">
      <div class="flex justify-center">
        <div class="w-800 h-70 bg-#001067 rounded-10 b b-#16F5FF shadow-[0_0_20px_#16F5FF] fc text-30 pl-30">
          <el-dropdown trigger="click" class="cp" @command="handleCommand">
            <div class="fc c-white text-30 fwbold">
              <div class="w-100 fc">{{ `${year}年` }}</div> <span class="i-ic-twotone-arrow-drop-down text-40"></span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-scrollbar wrap-class="scrollbar" class="h-200!" style="--el-font-size-base: 18px">
                  <!-- <el-dropdown-item command="">全部</el-dropdown-item> -->
                  <el-dropdown-item v-for="(item, index) in archiveRecordYear" :key="index" :command="item">
                    {{ item
                    }}
                  </el-dropdown-item>
                </el-scrollbar>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <input
            v-model="table.requestPageSettings.q" type="text"
            class="flex-1 w-0 h-full bg-transparent text-white text-30 outline-none" placeholder="请输入姓名和身份证号搜索"
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
      <div class="flex h-full gap-20">
        <div
          class="w-390 flex flex-col p-40 bg-no-repeat bg-[length:100%_100%]"
          :style="{ backgroundImage: `url(${no1})` }"
        >
          <div class="flex items-center">
            <div class="fwbold text-20">单位列表</div>
            <img class="ml-20" src="@/assets/images/i_icon.png" alt="">
          </div>
          <div class="flex-1 departmentTree mt-20 [&_.el-tree]:text-20!">
            <el-scrollbar height="700px">
              <el-tree
                style="--el-fill-color-blank: transparent; --el-fill-color-light: transparent; --el-color-primary-light-9: #00A0E9;"
                highlight-current :data="departmentTree" :props="defaultProps" default-expand-all
                :expand-on-click-node="false" @node-click="handleClickDepart"
              >
                <template #default="{ data }">
                  <div class="flex items-center w-full c-white">
                    <el-icon :size="14">
                      <Bell />
                    </el-icon>
                    {{ data.name }}
                    <div class="flex-1"></div>
                  </div>
                </template>
              </el-tree>
            </el-scrollbar>
          </div>
        </div>
        <div
          class="flex-1 flex flex-col p-40 bg-no-repeat bg-[length:100%_100%]"
          :style="{ backgroundImage: `url(${no2})` }"
        >
          <div class="flex items-center">
            <div class="fwbold text-20">全部档案</div>
            <img class="ml-20" src="@/assets/images/i_icon.png" alt="">
          </div>
          <div class="mt-20 grid grid-cols-7 gap-24">
            <div
              v-for="i, idx in table.tableData.value" :key="idx" class="flex flex-col items-center cp"
              @click="router.push({ name: 'inquire_self_detail', query: { id: i.id, type: '档案查询' } }), historyList.push('inquire_self')"
            >
              <img v-if="i.photo" :src="i.photo" class="w-120 h-156 object-cover" alt="">
              <img v-else src="@/assets/images/h_empty.png" class="w-120 h-156" alt="">
              <div class="mt-12 text-line-1 leading-20 w-118 text-center text-18">{{ i.name }}</div>
            </div>
          </div>
          <div class="flex-1"></div>
          <div class="flex justify-center mt-20px">
            <el-pagination
              v-model:current-page="table.requestPageSettings.pageNumber"
              style="--el-color-primary: #F96352; --el-disabled-bg-color: #0067AE; --el-text-color-placeholder: #ffffff; --el-text-color-regular: #ffffff; --el-pagination-font-size: 16px;"
              :page-size="table.requestPageSettings.pageSize" layout="total, prev, pager, next, jumper" prev-text="上一页"
              next-text="下一页" :total="table.requestPageSettings.totalCount" background
              @current-change="table.handleCurrentChange"
            />
          </div>
        </div>
      </div>
    </div>
  </IContainer>
</template>

<style lang="scss" scoped>
.departmentTree {
  :deep(.el-tree-node__content) {
    height: 50px !important;
  }

  :deep(.el-tree>.el-tree-node) {
    padding-left: 0px !important;
  }

  :deep(.el-tree-node) {
    position: relative;
    padding-left: 16px;
  }

  :deep(.el-tree-node__children) {
    padding-left: 16px;
  }

  :deep(.el-tree-node :last-child:before) {
    height: 50px;
  }

  :deep(.el-tree>.el-tree-node:before) {
    border-left: none;
  }

  :deep(.el-tree>.el-tree-node:after) {
    border-top: none;
  }

  :deep(.el-tree-node:before) {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-left: 1px dashed #606266;
    bottom: 0px;
    height: 100%;
    top: -26px;
    width: 1px;
  }

  :deep(.el-tree-node:after) {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-top: 1px dashed #606266;
    height: 20px;
    top: 25px;
    width: 18px;
  }

  :deep(.el-tree .el-tree-node__expand-icon.expanded) {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  :deep(.el-tree .el-icon-caret-right:before) {
    content: "";
    font-size: 16px;
    color: #606266;
    position: absolute;
    left: -20px;
    top: -8px;
  }

  :deep(.el-tree .el-tree-node__expand-icon.expanded.el-icon-caret-right:before) {
    content: "";
    font-size: 16px;
    color: #606266;
    position: absolute;
    left: -20px;
    top: -8px;
  }

  :deep(.el-tree-node__expand-icon.is-leaf:before) {
    content: "";
    font-size: 16px;
    color: #606266;
    position: absolute;
    left: -20px;
    top: -8px;
  }

  :deep(.el-tree-node__content) {
    padding-left: 0px !important;
  }

  :deep(.el-tree-node__content>.el-tree-node__expand-icon) {
    padding: 0;
  }
}

:deep(.el-input__inner) {
  color: black !important;
}
</style>
