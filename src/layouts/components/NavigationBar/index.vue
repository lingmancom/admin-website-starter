<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { UserFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import Hamburger from '../Hamburger/index.vue'
import Breadcrumb from '../Breadcrumb/index.vue'
import Sidebar from '../Sidebar/index.vue'
import UserInfo from '../UserInfo/index.vue'
import { useUserStore } from '@/store/modules/user'
import { useSettingsStore } from '@/store/modules/settings'
import { useAppStore } from '@/store/modules/app'
import Notify from '@/components/Notify/index.vue'
import ThemeSwitch from '@/components/ThemeSwitch/index.vue'
import Screenfull from '@/components/Screenfull/index.vue'
import SearchMenu from '@/components/SearchMenu/index.vue'
import { DeviceEnum } from '@/constants/app-key'
import { toLogin } from '@/utils'

const appStore = useAppStore()
const settingsStore = useSettingsStore()
const userStore = useUserStore()

const { sidebar, device } = storeToRefs(appStore)
const { layoutMode, showNotify, showThemeSwitch, showScreenfull, showSearchMenu } = storeToRefs(settingsStore)

const isDev = import.meta.env.MODE === 'development'

const isTop = computed(() => layoutMode.value === 'top')
const isMobile = computed(() => device.value === DeviceEnum.Mobile)

/** 切换侧边栏 */
function toggleSidebar() {
  appStore.toggleSidebar(false)
}

/** 登出 */
function logout() {
  userStore.logout()
  toLogin()
}

function setOnlinePort() {
  localStorage.setItem('port', 'http://lm:5502')
  ElMessage.success('线上接口设置成功')
}

function setLocalPort() {
  localStorage.setItem('port', 'http://hekui:8080')
  ElMessage.success('本地接口设置成功')
}

async function cleanEs() {
  ElMessageBox.confirm('确认清除es吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    await Api.clearEs()
    ElMessage.success('正在更新中，需要耐心等待，稍后页面查看')
  }).catch(() => { })
}
</script>

<template>
  <div class="navigation-bar">
    <Hamburger v-if="!isTop || isMobile" :is-active="sidebar.opened" class="hamburger" @toggle-click="toggleSidebar" />
    <Breadcrumb v-if="!isTop || isMobile" class="breadcrumb" />
    <Sidebar v-if="isTop && !isMobile" class="sidebar" />
    <div v-if="isDev" class="flex items-center">
      <el-button type="primary" size="small" @click="setOnlinePort">
        线上接口
      </el-button>
      <el-button type="primary" size="small" @click="setLocalPort">
        本地接口
      </el-button>
    </div>
    <div class="right-menu">
      <SearchMenu v-if="showSearchMenu" class="right-menu-item" />
      <Screenfull v-if="showScreenfull" class="right-menu-item" />
      <ThemeSwitch v-if="showThemeSwitch" class="right-menu-item" />
      <Notify v-if="showNotify" class="right-menu-item" />
      <el-dropdown class="right-menu-item">
        <div class="right-menu-avatar">
          <el-avatar :icon="UserFilled" :size="30" />
          <span>{{ userStore.userInfo.name }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="cleanEs()">
              <span style="display: block">更新搜索</span>
            </el-dropdown-item>
            <el-dropdown-item @click="userStore.passwordDialogVisible = true">
              <span style="display: block">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item @click="userStore.userCenterDialogVisible = true">
              <span style="display: block">个人中心</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout">
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <UserInfo></UserInfo>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navigation-bar {
  height: var(--v3-navigationbar-height);
  overflow: hidden;
  background: var(--v3-header-bg-color);
  display: flex;
  justify-content: space-between;

  .hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 15px;
    cursor: pointer;
  }

  .breadcrumb {
    flex: 1;

    // 参考 Bootstrap 的响应式设计将宽度设置为 576
    @media screen and (max-width: 576px) {
      display: none;
    }
  }

  .sidebar {
    flex: 1;
    // 设置 min-width 是为了让 Sidebar 里的 el-menu 宽度自适应
    min-width: 0px;

    :deep(.el-menu) {
      background-color: transparent;
    }

    :deep(.el-sub-menu) {
      &.is-active {
        .el-sub-menu__title {
          color: var(--el-menu-active-color) !important;
        }
      }
    }
  }

  .right-menu {
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #606266;

    .right-menu-item {
      padding: 0 10px;
      cursor: pointer;
      display: flex;
      align-items: center;

      .right-menu-avatar {
        display: flex;
        align-items: center;

        .el-avatar {
          margin-right: 10px;
        }

        span {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
