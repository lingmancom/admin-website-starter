<script setup lang="ts">
const userStore = useUserStore()
const { passwordDialogVisible } = storeToRefs(userStore)

const passwordItem = reactive(generatePasswordItem())
function generatePasswordItem() {
  return {
    id: '',
    newPassword: '',
    newPassword2: '',
    oldPassword: '',
  }
}

async function savePassword() {
  if (!passwordItem.oldPassword) {
    ElMessage.error('请输入旧密码')
    return
  }
  if (!passwordItem.newPassword) {
    ElMessage.error('请输入新密码')
    return
  }
  if (!passwordItem.newPassword2) {
    ElMessage.error('请再次输入新密码')
    return
  }
  if (passwordItem.newPassword !== passwordItem.newPassword2) {
    ElMessage.error('两次输入的新密码不一致')
    return
  }
  const passwordInfo = reactive({
    // username: userStore.userInfo.username,
    // password: passwordItem.newPassword,
    oldPassword: passwordItem.oldPassword,
    newPassword: passwordItem.newPassword,
    confirmPassword: passwordItem.newPassword2,
  })
  await Api.changePassword(passwordInfo)
  passwordDialogVisible.value = false
  Object.assign(passwordItem, generatePasswordItem())
  ElMessage.success('保存成功')
  userStore.logout()
}
</script>

<template>
  <el-dialog v-model="passwordDialogVisible" destroy-on-close :close-on-click-modal="false" width="450px">
    <template #header>
      <div class="cf">
        <div class="fl h19 leading-16 text-20 ml-10 fwbold c-black">
          修改密码
        </div>
      </div>
    </template>

    <div class="cf leading-40">
      <span class="fl text-16 mr-10 star"> 旧密码：</span>
      <el-input
        v-model="passwordItem.oldPassword" class="p !w-300 fr" type="password" show-password
        placeholder="请输入旧密码"
      ></el-input>
    </div>
    <div class="cf leading-40 my-20">
      <span class="fl text-16 mr-10 star"> 新密码：</span>
      <el-input
        v-model="passwordItem.newPassword" class="p !w-300 fr" type="password" show-password
        placeholder="请输入新密码"
      ></el-input>
    </div>
    <div class="cf leading-40">
      <span class="fl text-16 mr-10 star"> 确认密码：</span>
      <el-input
        v-model="passwordItem.newPassword2" class="p !w-300 fr" type="password" show-password
        placeholder="请输入确认密码"
      ></el-input>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="(passwordDialogVisible = false, Object.assign(passwordItem, generatePasswordItem()))">
          取 消
        </el-button>
        <el-button type="primary" @click="savePassword">
          保 存
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang='scss' scoped></style>
