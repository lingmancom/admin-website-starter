import { createRouter } from 'vue-router'
import { flatMultiLevelRoutes, history } from './helper'
import { constantRoutes } from './routes'
import routeSettings from '@/config/route'

const router = createRouter({
  history,
  routes: routeSettings.thirdLevelRouteCache ? flatMultiLevelRoutes(constantRoutes) : constantRoutes,
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length)
        router.hasRoute(name) && router.removeRoute(name)
    })
  }
  catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router
