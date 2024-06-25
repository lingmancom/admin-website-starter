<script setup lang="tsx">
import { type colConfig, setColsConfig } from '@/components/eTable/eTableUtils'
import { ActionMeta } from '@/config'

// const userStore = useUserStore()

const modal = useModal()

const activeDepart = ref(null)

const table = useCRUDVariable({
  requestPageSettings: {
    pageSize: 12,
  },
  getParams: {
    get unitId() { return activeDepart.value?.id },
  },
  getApiFn: API_SYSTEM_SETTINGS.getUserList,
  deleteApiFn: API_SYSTEM_SETTINGS.deleteRole,
})

table.loadData()

const tableColumnConfig: colConfig[] = setColsConfig([
  { type: 'selection' },
  { prop: 'account', label: '登录账号' },
  { prop: 'name', label: '姓名' },
  // { prop: 'unitName', label: '单位' },
  { prop: 'position', label: '职位' },
  { prop: 'createdAt', label: '注册时间' },
  { prop: 'lastLoginDate', label: '上次登录时间' },
  { prop: 'count', label: '登录次数' },
  // { prop: 'phone', label: '联系电话' },
  // { prop: 'email', label: '邮箱' },
  { prop: 'lastLoginIp', label: 'IP地址' },
  { prop: 'roleName', label: '角色', width: 150 },
  // { label: '启用状态', prop: 'state', fixed: 'right' },
  { label: '操作', prop: 'operation', fixed: 'right', width: 200 },
], { align: 'center' })

async function updateEnabled(row) {
  await API_SYSTEM_SETTINGS.switchUserStatus({
    ids: [row.id],
    enabled: row.status,
  })
  ElMessage.success('操作成功')
  table.loadData()
}

function addAccount(type: ActionMeta = ActionMeta.添加, data?) {
  const formRef = ref(null)
  const formData = reactive<DataType<typeof API_SYSTEM_SETTINGS.saveUserItem>>({} as any)

  const deptList = ref([])
  API_SYSTEM_SETTINGS.getAllDept().then((res) => {
    deptList.value = traverse(res, {
      children: 'children',
      label: 'name',
      value: 'id',
    })
  })

  const roleList = ref([])
  API_SYSTEM_SETTINGS.getRoleList({}).then((res) => {
    roleList.value = res.data
  })

  if (type !== ActionMeta.添加) Object.assign(formData, data)
  const isEditable = type === ActionMeta.编辑 || type === ActionMeta.添加

  modal.open({
    attrs: {
      width: 500,
    },
    title: '编辑账号',
    content({ onOk, close }) {
      return (
        <>
          <el-form ref={formRef} model={formData} label-width="80px" disabled={!isEditable}>
            <el-form-item label="登录账号" prop="account" message="请输入账号">
              <el-input disabled={type === ActionMeta.编辑} v-model={formData.account} placeholder="请输入账号"></el-input>
            </el-form-item>
            {
              type === ActionMeta.添加
                && (
                  <el-form-item label="密码" prop="password" message="请输入密码">
                    <el-input type="password" show-password v-model={formData.password} placeholder="请输入密码"></el-input>
                  </el-form-item>
                )
            }

            <el-form-item label="姓名" prop="name" message="请输入姓名">
              <el-input v-model={formData.name} placeholder="请输入姓名"></el-input>
            </el-form-item>
            {/* <el-form-item label="单位" prop="unitId">
              {
                Array.isArray(deptList.value)
                && <el-tree-select v-model={formData.unitId} data={deptList.value} check-strictly></el-tree-select>
              }
            </el-form-item> */}
            <el-form-item
              label="职位"
              prop="position"
            >
              <el-input v-model={formData.position}></el-input>
            </el-form-item>
            <el-form-item label="角色权限" prop="role" message="请选择角色权限">
              <el-select v-model={formData.role} placeholder="请选择角色权限">
                {roleList.value.map(item => (
                  <el-option label={item.name} value={item.id}></el-option>
                ))}
              </el-select>
            </el-form-item>
          </el-form>
          <div class="text-right">
            <el-button onClick={close}>取 消</el-button>
            <el-button type="primary" loading={onOk.loading.value} onClick={onOk}>确 定</el-button>
          </div>
        </>
      )
    },
    async onOk() {
      await formRef.value.validate()
      await API_SYSTEM_SETTINGS.saveUserItem(formData)
      ElMessage.success('操作成功')
      table.loadData()
    },
  })
}

function changePsw(data?) {
  const formRef = ref(null)
  const formData = reactive({
    account: data?.account,
    password: data?.password,
  })

  const roleList = ref([])
  API_SYSTEM_SETTINGS.getRoleList({}).then((res) => {
    roleList.value = res.data
  })

  modal.open({
    attrs: {
      width: 500,
    },
    title: '修改密码',
    content({ close, onOk }) {
      return (
        <>
          <el-form model={formData} ref={formRef} label-width="80px">
            <el-form-item label="账号: ">
              <el-input disabled v-model={formData.account}></el-input>
            </el-form-item>
            <el-form-item label="密码: ">
              <el-input type="password" show-password v-model={formData.password}></el-input>
            </el-form-item>
          </el-form>
          <div class="text-right">
            <el-button onClick={close}>取 消</el-button>
            <el-button onClick={onOk} loading={onOk.loading.value} type="primary">确 定</el-button>
          </div>
        </>
      )
    },
    async onOk() {
      await formRef.value.validate()
      await API_SYSTEM_SETTINGS.resetPsw({
        id: data.id,
        newPassword: formData.password,
      })
      ElMessage.success('操作成功')
      table.loadData()
    },
  })
}

// const treeRef = ref(null)
const departmentTree = ref([])
async function getDepartmentTree() {
  const res = await API_SYSTEM_SETTINGS.getAllDept()
  departmentTree.value = res
}
// function handleClickDepart(v) {
//   activeDepart.value = v
//   table.loadData()
// }
getDepartmentTree()
</script>

<template>
  <div class="w-full flex gap-x-10px">
    <!-- <el-card class="w-300px" body-class="flex flex-col flex-grow h-90%">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="text-20 font-bold">用户管理</div>
        </div>
      </template>

<el-tree ref="treeRef" :data="departmentTree" check-strictly node-key="id" default-expand-all
  :expand-on-click-node="false" @node-click="handleClickDepart">
  <template #default="{ data }">
          <div class="flex items-center w-full">
            {{ data.name }}
            <div class="flex-1"></div>
            <div>{{ data.prefix }}</div>
          </div>
        </template>
</el-tree>
</el-card> -->
    <el-card class="flex-1" body-class="flex flex-col flex-grow justify-between h-full">
      <div class="flex items-center justify-between mb-16px">
        <!-- <el-radio-group v-model="type">
          <el-radio-button :value="TypeEnum.All">全部</el-radio-button>
          <el-radio-button :value="TypeEnum.Common">普通用户</el-radio-button>
          <el-radio-button :value="TypeEnum.Admin">管理员</el-radio-button>
        </el-radio-group> -->

        <div class="fwbold text-20">
          用户管理
        </div>

        <el-input
          v-model="table.requestPageSettings.q" placeholder="请输入搜索内容" class="!w-300" clearable
          @clear="(table.requestPageSettings.pageNumber = 1, table.loadData())"
          @keyup.enter="(table.requestPageSettings.pageNumber = 1, table.loadData())"
        >
          <template #append>
            <el-button @click="(table.requestPageSettings.pageNumber = 1, table.loadData())">
              搜索
            </el-button>
          </template>
        </el-input>
        <div>
          <el-button type="primary" @click="addAccount(ActionMeta.添加)">新 增</el-button>
          <el-button type="danger" @click="table.deleteData()">删 除</el-button>
        </div>
      </div>
      <ETable class="flex-1" :data="table.tableData.value" :loading="table.loading.value" :table-column-config="tableColumnConfig" @selection-change="table.handleSelectionChange">
        <template #state="{ row }">
          <el-switch v-model="row.status" @click="updateEnabled(row)">
          </el-switch>
        </template>
        <template #roleName="{ row }">
          <el-tag>{{ row.roleName }}</el-tag>
        </template>
        <template #operation="{ row }">
          <div>
            <el-button v-if="row.account !== 'admin'" type="primary" @click="addAccount(ActionMeta.编辑, row)">编辑</el-button>
            <el-button type="danger" @click="changePsw(row)">修改密码</el-button>
          </div>
        </template>
      </ETable>
      <div class="fc h-50 mt-10">
        <el-pagination
          v-model:current-page="table.requestPageSettings.pageNumber"
          :page-size="table.requestPageSettings.pageSize" layout="total, prev, pager, next, jumper" prev-text="上一页"
          next-text="下一页" :total="table.requestPageSettings.totalCount" background
          @current-change="table.handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>
