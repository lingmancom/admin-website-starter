<script setup lang="ts">
const userStore = useUserStore()
userStore.getInfo()

const userInfo = computed(() => userStore.userInfo)

const formRef = ref(null)
const rules = {
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  unit: [{ required: true, message: '请输入单位', trigger: 'blur' }],
}

const editUserInfo = reactive({
  name: userInfo.value.name || '',
  account: userInfo.value.account || '',
  phone: userInfo.value.phone || '',
  role: userInfo.value.role || '',
  email: userInfo.value.email || '',
  // unit: userInfo.value.unit.name || '',
  position: userInfo.value.position || '',
})

function updateUserInfo() {
  formRef.value.validate().then(() => ApiAccount.updateInfo({
    id: userInfo.value.id,
    position: userInfo.value.position,
    unitId: userInfo.value.unitId,
    ...editUserInfo,
  })).then(() => {
    ElMessage({
      message: '更新成功',
      type: 'success',
    })
    userStore.getInfo()
    userStore.userCenterDialogVisible = false
  }, () => {
    ElMessage({
      message: '更新失败',
      type: 'error',
    })
  })
}

const departmentTree = ref([])
const defaultProps = {
  children: 'children',
  label: 'name',
  value: 'id',
}
async function getDepartmentTree() {
  const res = await Api.getUnitList()
  departmentTree.value = [res].flat(Number.POSITIVE_INFINITY)
  console.log(departmentTree.value)
  await nextTick()
  if (userStore.userCenterDialogVisible)
    updateSelect(userInfo.value.unitId)
}

watch(() => userStore.userCenterDialogVisible, (val) => {
  if (val)
    getDepartmentTree()
})

const { selectVal, setParent, handleNodeClickEvent, findNodeById } = joinUnit()

function updateSelect(id) {
  const list = setParent([...departmentTree.value])
  let res
  for (let idx = 0; idx < list.length; idx++) {
    const node = list[idx]
    const foundNode = findNodeById(node, id, 1)
    if (foundNode) {
      res = foundNode
      break
    }
  }
  if (!res) return

  handleNodeClickEvent(res)
  // editUserInfo.unit = res.id
}
</script>

<template>
  <el-dialog v-model="userStore.userCenterDialogVisible" destroy-on-close :close-on-click-modal="false" width="60%">
    <template #header>
      <div class="cf">
        <div class="fl h19 leading-16 text-20 ml-10 fwbold c-black">
          个人中心
        </div>
      </div>
    </template>
    <el-row :gutter="10">
      <el-col :span="8" class="">
        <el-card header="个人信息" body-class="fc flex-col" class="h-full">
          <div class="w-80 h80 bg-blue rounded-50%" />
          <div class="w-full flex justify-between items-center h-32 border-0 border-b-1 border-solid border-blueGray">
            <span>姓名</span>
            <span>{{ userInfo.name }}</span>
          </div>
          <div class="w-full flex justify-between items-center h-32 border-0 border-b-1 border-solid border-blueGray">
            <span>账号</span>
            <span>{{ userInfo.account }}</span>
          </div>
          <div class="w-full flex justify-between items-center h-32 border-0 border-b-1 border-solid border-blueGray">
            <span>手机号码</span>
            <span>{{ userInfo.phone }}</span>
          </div>
          <div class="w-full flex justify-between items-center h-32 border-0 border-b-1 border-solid border-blueGray">
            <span>所属单位</span>
            <span>{{ userInfo.unit.name }}</span>
          </div>
          <div class="w-full flex justify-between items-center h-32 border-0 border-b-1 border-solid border-blueGray">
            <span>所属角色</span>
            <span class="text-blue">{{ userInfo.role === 'admin' ? '超级管理员' : '普通用户' }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card header="基本资料">
          <el-form ref="formRef" :model="editUserInfo" label-width="100px" :rules="rules">
            <el-form-item label="登录账号" prop="account" required>
              <el-input v-model="editUserInfo.account" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name" required>
              <el-input v-model="editUserInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="单位部门" prop="unit" required>
              <el-tree-select
                disabled :model-value="selectVal" class="w-full" :data="departmentTree"
                :props="defaultProps" check-strictly :render-after-expand="false" @update:model-value="updateSelect"
              />
            </el-form-item>
            <el-form-item label="职位">
              <el-input v-model="editUserInfo.position"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input v-model="editUserInfo.phone"></el-input>
            </el-form-item>
          </el-form>
          <div class="text-right">
            <el-button @click="userStore.userCenterDialogVisible = false">
              取消
            </el-button>
            <el-button type="primary" @click="updateUserInfo">
              保存
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<style lang='scss' scoped></style>
