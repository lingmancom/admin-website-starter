/* eslint-disable ts/no-use-before-define */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { usePermissionStore } from './permission'
import { useTagsViewStore } from './tags-view'
import { useSettingsStore } from './settings'
import store from '@/store'
import { getToken, removeToken, setToken } from '@/utils/cache/cookies'
import router, { resetRouter } from '@/router'
import routeSettings from '@/config/route'
import { ApiAccount } from '@/api/account'

interface IUserInfo {
  id: string
  account: string
  name: string
  email: string
  phone: string
  role: string
  unit: {
    id: string
    name: string
    parentId: string
    sort: number
    createdBy: string
    createdAt: string
    updatedAt: string
    deletedAt: any
    topUnit: any
  }
  unitName: any
  unitId: string
  lastLoginIp: any
  lastLoginDate: any
  createdAt: string
  updatedAt: string
  count: number
  status: number
  position: any
}

export const useUserStore = defineStore('user', () => {
  const userInfo = reactive({} as IUserInfo)
  const token = ref<string>(getToken() || '')
  const roles = ref<number[]>([])

  const passwordDialogVisible = ref<boolean>(false)
  const userCenterDialogVisible = ref<boolean>(false)

  const permissionStore = usePermissionStore()
  const tagsViewStore = useTagsViewStore()
  const settingsStore = useSettingsStore()

  /** 设置角色数组 */
  const setRoles = (value: number[]) => {
    roles.value = value
  }
  /** 登录 */
  const login = async ({ account, password }) => {
    return ApiAccount.login({ account, password })
      .then((data: any) => {
        setToken(data)
        token.value = data
      })
  }

  /** 获取用户详情 */
  const getInfo = async () => {
    const data = await ApiAccount.getUserInfo()
    Object.assign(userInfo, data)
    // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
    // roles.value = data.roles?.length > 0 ? data.roles : routeSettings.defaultRoles
    roles.value = data.role ? [data.role] : routeSettings.defaultRoles
    if (data.isAdmin === 1)
      roles.value.push(0)
  }

  /** 切换角色 */
  const changeRoles = async (role: string) => {
    const newToken = `token-${role}`
    token.value = newToken
    setToken(newToken)
    await getInfo()
    permissionStore.setRoutes(roles.value)
    resetRouter()
    permissionStore.dynamicRoutes.forEach((item: RouteRecordRaw) => {
      router.addRoute(item)
    })
    _resetTagsView()
  }
  /** 登出 */
  const logout = () => {
    removeToken()
    token.value = ''
    roles.value = []
    resetRouter()
    _resetTagsView()
  }
  /** 重置 Token */
  const resetToken = () => {
    removeToken()
    token.value = ''
    roles.value = []
  }
  /** 重置 Visited Views 和 Cached Views */
  const _resetTagsView = () => {
    if (!settingsStore.cacheTagsView) {
      tagsViewStore.delAllVisitedViews()
      tagsViewStore.delAllCachedViews()
    }
  }

  return { token, roles, userInfo, passwordDialogVisible, userCenterDialogVisible, setRoles, login, getInfo, changeRoles, logout, resetToken }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
