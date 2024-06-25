<script setup lang="ts">
import { APIPermission } from '@/api/permission'

enum TypeEnum {
  Catalog = 'catalog',
  Menu = 'menu',
  Button = 'button',
}

const data = ref([])
function traverse(tree) {
  tree.forEach((item) => {
    item.label = item.name
    item.value = item.id
    if (item.children)
      traverse(item.children)
  })
}
async function loadTable() {
  const res = await APIPermission.getPermissionTree()
  traverse(res)
  // console.log('res', res)
  data.value = res
}
loadTable()

const dialogVisible = ref(false)
const dialogTitle = ref('')
let dialogData = reactive({} as any)

function dialogVisibleToggle() {
  dialogVisible.value = !dialogVisible.value
}

function openDialog(data) {
  Object.assign(dialogData, { ...data, menuType: TypeEnum.Catalog })
  dialogVisibleToggle()
}
function openEdit(data) {
  openDialog(data)
  dialogTitle.value = '编辑菜单'
}
function openAdd(data) {
  dialogData = reactive({ sort: 100 })
  openDialog(data)
  dialogTitle.value = '新建菜单'
}
function addChild(data) {
  dialogData = reactive({})
  openDialog({
    parentId: data.id,
  })
  dialogTitle.value = '添加子级'
}
function handleDelete(data) {
  ElMessageBox.confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    return APIPermission.deletePermissionItem({ ids: [data.id] })
      .then(() => {
        ElMessage({
          type: 'success',
          message: '删除成功!',
        })
        loadTable()
      })
  })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除',
      })
    })
}

const opMapper = {
  add: addChild,
  new: openAdd,
  edit: openEdit,
  del: handleDelete,
}

function handleCommand(command) {
  console.log('command', command)

  opMapper[command.op](command.data)
}

const loading = ref(false)
const formRef = ref(null)

async function savePermissionItem() {
  await formRef.value.validate()
  if (loading.value) return
  loading.value = true
  await APIPermission.savePermissionItem({
    id: dialogData.id,
    parentId: dialogData.parentId,
    type: dialogData.menuType,
    name: dialogData.name,
    permission: dialogData.permission,
    route: dialogData.route,
    sort: dialogData.sort,
  })
  loading.value = false
  dialogVisible.value = false
  loadTable()
}

const rules = {
  permission: [{ required: true, message: '请输入权限标识', trigger: 'blur' }],
  name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  // unit: [{ required: true, message: '请输入单位', trigger: 'blur' }],
}
</script>

<template>
  <div class="permission-manage">
    <teleport to="body">
      <el-dialog v-model="dialogVisible" destroy-on-close class="!w-700px">
        <template #header>
          {{ dialogTitle }}
        </template>
        <template #default>
          <div class="flex items-center gap-x-30px">
            <div class="menu-type flex flex-col gap-y-10px">
              菜单类型 {{ dialogData.menuType }}
              <el-radio-group v-model="dialogData.menuType">
                <el-radio-button :value="TypeEnum.Catalog">目录</el-radio-button>
                <el-radio-button :value="TypeEnum.Menu">菜单</el-radio-button>
                <el-radio-button :value="TypeEnum.Button">按钮</el-radio-button>
              </el-radio-group>
            </div>
            <div class="parent flex-grow flex flex-col gap-y-10px">
              父级
              <el-tree-select
                v-model="dialogData.parentId" check-strictly placeholder="默认为根节点"
                :data="data"
              ></el-tree-select>
            </div>
          </div>
          <div class="basic-info">
            <el-divider content-position="left">
              <div un-text="20px" un-font="bold">基本信息</div>
            </el-divider>
            <div>
              <el-form ref="formRef" label-position="top" :item="dialogData" :model="dialogData" :rules="rules">
                <div class="flex flex-wrap items-center justify-between ">
                  <el-form-item prop="name" label="菜单名称" class="w-48%">
                    <el-input v-model="dialogData.name" />
                  </el-form-item>
                  <template v-if="dialogData.menuType === 'menu'">
                    <el-form-item prop="componentPath" label="组件路径" class="w-48%">
                      <el-input v-model="dialogData.componentPath" maxlength="200" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item prop="redirect" label="重定向" class="w-48%">
                      <el-input v-model="dialogData.redirect" maxlength="100" show-word-limit></el-input>
                    </el-form-item>
                  </template>
                  <template v-if="dialogData.menuType !== 'button'">
                    <el-form-item prop="route" label="路由地址" class="w-48%">
                      <el-input v-model="dialogData.route" maxlength="100" show-word-limit />
                    </el-form-item>
                  </template>

                  <el-form-item prop="permission" label="权限标识" class="w-48%">
                    <el-input v-model="dialogData.permission" maxlength="100" show-word-limit />
                  </el-form-item>
                  <el-form-item prop="status" label="状态" class="w-48%">
                    <el-radio-group v-model="dialogData.status">
                      <el-radio label="正常" value="正常" />
                      <el-radio label="禁用" value="禁用" />
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="排序" props="sort" class="w-48%">
                    <el-input v-model="dialogData.sort" placeholder="请输入排序" />
                  </el-form-item>
                </div>
              </el-form>
            </div>
          </div>
        </template>
        <template #footer>
          <div>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="savePermissionItem">确认</el-button>
          </div>
        </template>
      </el-dialog>
    </teleport>
    <div>
      <div class="text-right mb-10px">
        <el-button type="primary" @click="handleCommand({ op: 'new' })">新建</el-button>
      </div>
      <el-table :data="data" row-key="id">
        <el-table-column align="left" prop="name" label="菜单名称" />
        <el-table-column align="center" prop="type" label="菜单类型" width="180">
          <template #default="{ row }">
            <el-tag>
              {{ row.type }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="routeAddr" label="路由地址" width="180" />
        <el-table-column align="center" prop="permission" label="权限标识" width="300">
          <template #default="{ row }">
            <el-tag>
              {{ row.permission }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="sort" min-width="120" />
        <el-table-column align="center" fixed="right" label="操作" width="180">
          <template #default="{ row }">
            <el-dropdown @command="handleCommand">
              <el-button type="primary">
                操作<el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :command="{ op: 'add', data: row }">添加子级</el-dropdown-item>
                  <el-dropdown-item :command="{ op: 'edit', data: row }">编辑</el-dropdown-item>
                  <el-dropdown-item :command="{ op: 'del', data: row }">删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang='scss' scoped></style>
