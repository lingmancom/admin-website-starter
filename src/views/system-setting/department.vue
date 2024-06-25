<script setup lang="ts">
// 部门结构
const departmentTree = ref([])
// 新增部门
const addDepartmentDialog = ref(false)

// 树形图规则
const defaultProps = {
  children: 'children',
  label: 'name',
  value: 'id',
}

// 添加部门信息
const addData = reactive(generateAddData())

function generateAddData() {
  return {
    id: '',
    parentId: null,
    name: '',
    // parent: {} as any,
    parentName: '',
    sort: 100,
  }
}

// 点击部门回调事件
function handleClickDepart(data) {
  Object.assign(addData, data, { parentName: data.parentName || '' })
}

// 获取部门数据
async function getDepartmentTree() {
  const res = await Api.getUnitList()
  departmentTree.value = [res].flat(Number.POSITIVE_INFINITY)
}

// 删除所选择的部门
const deleteDepartment = debounce(async () => {
  if (!addData.id)
    return ElMessage.error('请选择部门')
  ElMessageBox.confirm('此操作将永久删除, 是否继续?', '提示', { type: 'warning' }).then(async () => {
    await Api.deleteUnit({ ids: [addData.id] })
    getDepartmentTree()
    Object.assign(addData, generateAddData())
    ElMessage.success('删除成功')
  },
  ).catch(() => {
    ElMessage.error('删除失败')
  })
}, 500, true)

// 添加部门
const saveDepartment = debounce(async () => {
  if (!addData.parentId)
    addData.parentId = undefined

  if (!addData.name)
    return ElMessage.error('请输入名称')
  await Api.saveUnit(addData)
  getDepartmentTree()
  // Object.assign(addData, generateAddData())
  addDepartmentDialog.value = false
  ElMessage.success('添加成功')
}, 500, true)

getDepartmentTree()
</script>

<template>
  <div class="w-full flex">
    <el-card class="h-full mr-12 min-w-300">
      <template #header>
        <div class="flex justify-between items-center">
          <div class="text-20 font-bold">
            组织架构
          </div>
          <el-button
            size="small" type="primary"
            @click="addDepartmentDialog = true, Object.assign(addData, generateAddData())"
          >
            新增
          </el-button>
        </div>
      </template>
      <div class="departmentTree">
        <el-tree
          :data="departmentTree" :props="defaultProps" default-expand-all :expand-on-click-node="false"
          @node-click="handleClickDepart"
        >
          <template #default="{ data }">
            <div class="flex items-center w-full">
              <el-icon v-if="!data.parentName" :size="14">
                <OfficeBuilding />
              </el-icon>
              <el-icon v-else :size="14">
                <User />
              </el-icon>
              {{ data.name }}
              <div class="flex-1"></div>
            </div>
          </template>
        </el-tree>
      </div>
    </el-card>

    <el-card class="flex-1">
      <template #header>
        <div class="flex items-center">
          <div class="text-20 font-bold">
            部门编辑
          </div>
        </div>
      </template>
      <div class="w60% pl-40 pt-20 ">
        <div class="uno-flex-center ">
          <div class="w120 text-right">
            上级部门：
          </div>
          <el-input v-model="addData.parentName" disabled />
        </div>
        <div class="uno-flex-center mt20">
          <div class="w120 text-right">
            名称：
          </div>
          <el-input v-model="addData.name" />
        </div>
        <div class="uno-flex-center mt20">
          <div class="w120 text-right">
            排序：
          </div>
          <el-input v-model="addData.sort" />
        </div>
        <div class="mt-30 flex justify-end">
          <el-button type="danger" @click="deleteDepartment()">
            删除
          </el-button>
          <el-button type="primary" @click="saveDepartment()">
            保存
          </el-button>
        </div>
      </div>
    </el-card>

    <el-dialog v-model="addDepartmentDialog" title="新增部门">
      <el-form label-width="80">
        <el-form-item label="上级部门">
          <el-tree-select
            v-model="addData.parentId" :data="departmentTree" :props="defaultProps" check-strictly
            :render-after-expand="false"
          />
        </el-form-item>
        <el-form-item label="名称" required>
          <el-input v-model="addData.name" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="addData.sort" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addDepartmentDialog = false">
          取 消
        </el-button>
        <el-button type="primary" @click="saveDepartment()">
          确 定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.departmentTree {

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
    height: 38px;
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
    top: 12px;
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
</style>
