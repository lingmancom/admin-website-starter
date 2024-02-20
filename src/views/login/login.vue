<script lang="ts" setup>
import bg from '@/assets/login_bg.png'
import account from '@/assets/icon/account.png'
import password from '@/assets/icon/password.png'

const globalStore = useGlobalDataStore()

const dynamicLoginBg = computed(() => globalStore.system.login || bg)

const loginFormDom = ref(null as any)
const showPassword = ref(true)
const isInput = ref(false)
const uid = ref('')

const loginForm = reactive({
  account: '',
  password: '',
  uid,
})

const loginRules = ({
  account: [{ required: true, trigger: 'blur', message: '账号不能为空' }],
  password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
})

const loading = ref(false)
const redirect = ref('')
const checked = ref(false)
const route = useRoute()
const router = useRouter()

watch(() => route, (val) => {
  redirect.value = val.query && val.query.redirect as string
}, { immediate: true })

// 登录方法
function handleLogin() {
  loginFormDom.value?.validate((valid: any) => {
    if (valid) {
      loading.value = true
      const userStore = useUserStore()

      userStore.login(loginForm).then(() => {
        router.push({ path: unref(redirect) || '/materialManage/info' })
        loading.value = false
      }).catch((e) => {
        // loadUid()
        ElMessage.error(e)
        loading.value = false
      })
    }
    else {
      console.log('error submit!!')
      return false
    }
  })
}

async function passwordChange(val) {
  if (isInput.value)
    return
  isInput.value = true

  if (val.length > 1)
    showPassword.value = false
}

async function forgetPassword() {
  ElMessage.success('请联系管理员重置密码')
}
</script>

<template>
  <div class="w-full h-full relative bg-no-repeat bg-cover" :style="{ backgroundImage: `url(${dynamicLoginBg})` }">
    <div class="absolute top-50% left-50% w-400 mt--250 ml--200 bg-white px40 rounded-10 py-30">
      <el-form ref="loginFormDom" class="w-320 [&_.el-input\_\_prefix]:leading-40" :rules="loginRules" :model="loginForm">
        <div class="font-bold text-20 tc mb-20">
          欢 迎 登 录
        </div>
        <el-form-item key="7" prop="account" require-asterisk-position="right">
          <el-input v-model="loginForm.account" size="large" placeholder="请输入账号">
            <template #prefix>
              <img :src="account" class="w-20 h-20 inline" alt="" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item key="8" prop="password" require-asterisk-position="right">
          <el-input
            v-model="loginForm.password" size="large" type="password" :show-password="showPassword"
            placeholder="请输入密码" @input="passwordChange" @keydown.enter="handleLogin"
          >
            <template #prefix>
              <img :src="password" class="w-20 h-20 inline" alt="" />
            </template>
          </el-input>
        </el-form-item>
        <div class="cf h-19 leading-19 mb20">
          <el-checkbox v-model="checked">
            记住密码
          </el-checkbox>
          <span class="fr text-14 leading-19 cp" @click="forgetPassword">忘记密码</span>
        </div>
        <el-button
          style="width: 100%; background-color: #005CEC; color:#fff;" size="large" class="mt-0px"
          @click="handleLogin"
        >
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>