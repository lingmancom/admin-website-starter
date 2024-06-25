<script setup lang="tsx">
import { ActionMeta } from '@/config'
import { addParentIds, filterParentIds } from '@/hooks/utils'

const modal = useModal()

function getAllId(data) {
  let list = []
  data.forEach((item) => {
    list.push(item.id)
    if (item.children)
      list = [...list, ...getAllId(item.children)]
  })
  return list
}

const table = useCRUDVariable({
  requestPageSettings: {
    pageSize: 8,
  },
  getApiFn: APIPermission.getRoleList,
  deleteApiFn: APIPermission.deleteRole,
})

table.loadData()

/** 获取总权限列表(树) */
const permissionTreeList = useCRUDVariable({
  getApiFn: APIPermission.getPermissionTree,
})
permissionTreeList.loadData().then(() => {
  console.log(2333, permissionTreeList.tableData.value)
})

function permissionOP(opType: ActionMeta, data?) {
  const formRef = ref(null)
  const formItem = reactive({ } as any)

  const treeRef = ref(null)
  const reRenderTree = ref(1)
  const expandList = ref<Array<string>>([])
  const checkedList = ref<Array<string>>([])
  function selectAll() {
    reRenderTree.value++
    if (!formItem.allSelect)
      checkedList.value = []
    else
      checkedList.value = getAllId(permissionTreeList.tableData.value)
  }
  function expandAll() {
    reRenderTree.value++
    if (!formItem.isOpen)
      expandList.value = []
    else
      expandList.value = getAllId(permissionTreeList.tableData.value)
  }

  if (opType === ActionMeta.编辑) {
    Object.assign(formItem, data)
    checkedList.value = filterParentIds(data.permissions, permissionTreeList.tableData.value)
  }

  modal.open({
    title: '修改权限',
    content({ close, onOk }) {
      return (
        <>
          <el-form ref={formRef} model={formItem} label-width="80px" class="mr-32px">
            <el-form-item label="角色名称" prop="name" message="请输入角色名称">
              <el-input v-model={formItem.name} placeholder="请输入角色名称" />
            </el-form-item>
            <el-form-item label="菜单权限">
              <el-checkbox v-model={formItem.isOpen} label="展开/折叠" onChange={expandAll} />
              <el-checkbox v-model={formItem.allSelect} label="全选/全不选" onChange={selectAll} />
              <div class="border border-#DCDFE6 border-solid w-full h-300px overflow-auto">
                <el-tree
                  ref={treeRef}
                  key={reRenderTree.value}
                  node-key="id"
                  data={permissionTreeList.tableData.value}
                  show-checkbox
                  props={{
                    children: 'children',
                    label: 'name',
                  }}
                  default-expanded-keys={expandList.value}
                  default-checked-keys={checkedList.value}
                />
              </div>
            </el-form-item>
            <el-form-item label="角色说明">
              <el-input v-model={formItem.description} type="textarea" placeholder="请输入角色说明" />
            </el-form-item>
            {/* <el-form-item label="排序" props="sort">
              <el-input v-model={formItem.sort} placeholder="请输入排序" />
            </el-form-item> */}
          </el-form>
          <div class="text-right">
            <el-button onClick={close}>取消</el-button>
            <el-button type="primary" loading={onOk.loading.value} onClick={onOk}>确定</el-button>
          </div>
        </>
      )
    },
    async onOk() {
      await formRef.value.validate()
      await APIPermission.saveRole({
        id: formItem.id,
        name: formItem.name,
        description: formItem.description,
        permissions: addParentIds(treeRef.value.getCheckedKeys(), permissionTreeList.tableData.value),
      })
      ElMessage.success('操作成功')
      table.loadData()
    },
  })
}
</script>

<template>
  <el-card class="h-full flex-1 flex flex-col" body-class="flex flex-col flex-1 h-0">
    <template #header>
      <div class="flex justify-between items-center">
        <div class="text-20 fwbold">
          角色权限
        </div>
        <div>
          <el-button type="primary" @click="permissionOP(ActionMeta.添加)">
            新增
          </el-button>
          <el-button type="danger" @click="table.deleteData()">
            删除
          </el-button>
        </div>
      </div>
    </template>
    <el-table
      v-loading="table.loading.value"
      class="flex-1 h-0" :data="table.tableData.value" :cell-style="{ 'text-align': 'center' }"
      :header-cell-style="{ 'text-align': 'center' }" style="width: 100%" border
      @selection-change="table.handleSelectionChange"
    >
      <el-table-column type="selection" />
      <el-table-column label="角色名称" prop="name" min-width="120" />
      <el-table-column label="账号数量" prop="count" min-width="120" />
      <el-table-column label="备注" prop="description" min-width="120" />
      <!-- <el-table-column label="排序" prop="sort" min-width="120" /> -->
      <el-table-column label="操作" min-width="120" fixed="right">
        <template #default="{ row }">
          <el-button type="danger" @click="permissionOP(ActionMeta.编辑, row)">
            分配权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-center mt10">
      <el-pagination
        v-model:current-page="table.requestPageSettings.pageNumber" :page-size="table.requestPageSettings.pageSize"
        layout="total, prev, pager, next, jumper" prev-text="上一页" next-text="下一页" :total="table.requestPageSettings.totalCount"
        background @current-change="table.handleCurrentChange"
      />
    </div>
  </el-card>
</template>
