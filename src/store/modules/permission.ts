import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import store from '@/store'
import { flatMultiLevelRoutes } from '@/router/helper'
import routeSettings from '@/config/route'
import { asyncRoutes, constantRoutes } from '@/router/routes'

// function hasPermission(roles: number[], route: RouteRecordRaw) {
//   const routeRoles = route.meta?.roles
//   return routeRoles ? roles.some(role => routeRoles.includes(role)) : true
// }

// function filterAsyncRoutes(routes: RouteRecordRaw[], roles: number[]) {
//   const res: RouteRecordRaw[] = []
//   routes.forEach((route) => {
//     const tempRoute = { ...route }
//     if (hasPermission(roles, tempRoute)) {
//       if (tempRoute.children)
//         tempRoute.children = filterAsyncRoutes(tempRoute.children, roles)
//       res.push(tempRoute)
//     }
//   })
//   return res
// }

function filterAsyncRoutes(routes: RouteRecordRaw[], permissions) {
  const res: RouteRecordRaw[] = []
  permissions.forEach((per) => {
    let onlyOne = false
    const tempRoute = routes.find((item) => {
      let i = item
      const len = item.children?.filter(child => !child.meta?.hidden) ?? []
      onlyOne = len.length === 1
      if (onlyOne)
        i = len[0]

      return i ? i.name === per.route : false
    })

    if (!tempRoute)
      return
    if (tempRoute.children && !onlyOne)
      tempRoute.children = filterAsyncRoutes(tempRoute.children, per.children)

    if (tempRoute.meta)
      tempRoute.meta.permission = per

    res.push(tempRoute)
  })
  return res
}

export const usePermissionStore = defineStore('permission', () => {
  const routes = ref<RouteRecordRaw[]>([])
  const permissions = ref([] as any[])
  const dynamicRoutes = ref<RouteRecordRaw[]>([])
  const currentPagePermission = ref({} as any)

  // eslint-disable-next-line unused-imports/no-unused-vars
  const setRoutes = (roles: number[]) => {
    const accessedRoutes = routeSettings.async ? filterAsyncRoutes(deepClone(asyncRoutes), permissions.value) : asyncRoutes
    console.log('xxx', accessedRoutes)
    // const accessedRoutes = asyncRoutes
    routes.value = constantRoutes.concat(accessedRoutes)
    dynamicRoutes.value = routeSettings.thirdLevelRouteCache ? flatMultiLevelRoutes(accessedRoutes) : accessedRoutes
  }

  return { routes, dynamicRoutes, setRoutes, permissions, currentPagePermission }
})

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
