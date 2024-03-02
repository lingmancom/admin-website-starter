import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

/**
 * 常驻路由
 * 除了 redirect/403/404/login 等隐藏页面，其他页面建议设置 Name 属性
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
        meta: {},

      },
    ],
  },
  {
    path: '/403',
    component: () => import('@/views/error-page/403.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      hidden: true,
    },
    alias: '/:pathMatch(.*)*',
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/',
    component: () => import('@/views-front/index.vue'),
    meta: {
      hidden: true,
    },
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views-front/home/home.vue'),
        meta: {},
      },
    ],
  },
  {
    path: '/editor',
    name: 'editor',
    component: Layout,
    redirect: '/editor',
    meta: {
      hidden: true,
      title: '编辑',
    },
    children: [
      {
        path: '/editor',
        name: 'editor',
        component: () => import('@/views/editor/editor.vue'),
        meta: { hidden: true },
      },
    ],
  },
  {
    path: '/system',
    component: Layout,
    meta: {
      title: '系统管理',
      svgIcon: 'setting',
      roles: ['admin'],
    },
    children: [

    ],
  },

  {
    path: '/test',
    component: Layout,
    meta: {
      title: '测试',
      svgIcon: 'setting',
      roles: ['admin'],
    },
    children: [
      {
        path: '/test',
        name: 'test',
        component: () => import('@/views-back/test/test.vue'),
        meta: { title: '测试', icon: 'el-icon-s-marketing', svgIcon: 'DocumentChecked', badge: true },
      },
    ],
  },

]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*', // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
    redirect: '/404',
    name: 'ErrorPage',
    meta: {
      hidden: true,
    },
  },

]
