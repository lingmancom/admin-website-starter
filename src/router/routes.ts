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
    component: Layout,
    redirect: '/dashboard',
    meta: {},
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/dashboard.vue'),
        meta: { title: '工作台', icon: 'el-icon-s-marketing', svgIcon: 'DocumentChecked', badge: true },
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
    path: '/test',
    component: Layout,
    meta: {
      title: '测试',
      svgIcon: 'setting',
      hidden: import.meta.env.MODE !== 'development',
    },
    children: [
      {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test/test.vue'),
        meta: { title: '测试', icon: 'el-icon-s-marketing', svgIcon: 'DocumentChecked', badge: true },
      },
    ],
  },
  {
    path: '/view_word',
    component: () => import('@/views/editor/viewDocument.vue'),
    meta: {
      title: '预览',
      svgIcon: 'setting',
      hidden: true,
    },
  },
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/system-setting',
    component: Layout,
    name: 'system-setting',
    meta: {
      title: '系统设置',
      svgIcon: 'setting',
      permission: 'system',
      alwaysShow: true,
    },
    children: [
      {
        path: 'department',
        name: 'department',
        component: () => import('@/views/system-setting/department.vue'),
        meta: {
          title: '组织架构',
          permission: 'system:department',
        },
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/system-setting/role.vue'),
        meta: {
          title: '角色权限',
          permission: 'system:role',
        },
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/system-setting/user-manage.vue'),
        meta: {
          title: '用户管理',
          permission: 'system:user',
        },
      },
      {
        path: 'logo',
        name: 'logo',
        component: () => import('@/views/system-setting/logo.vue'),
        meta: {
          title: 'Logo设置',
          permission: 'system:logo',
        },
      },
      {
        path: 'log',
        name: 'log',
        component: () => import('@/views/system-setting/operation-log.vue'),
        meta: {
          title: '操作日志',
          permission: 'system:log',
        },
      },
      {
        path: 'data-backup',
        name: 'data-backup',
        component: () => import('@/views/system-setting/data-backup.vue'),
        meta: {
          title: '数据备份',
          permission: 'system:data-backup',
        },
      },
      {
        path: 'permission',
        name: 'permission',
        component: () => import('@/views/system-setting/permission-manage.vue'),
        meta: {
          title: '权限管理',
          permission: 'system:permission',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*', // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
    redirect: '/404',
    name: 'ErrorPage',
    meta: {
      hidden: true,
    },
  },
]
