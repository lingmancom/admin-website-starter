export const API_SYSTEM_SETTINGS = {
  getRoleList: (data: {
    pageNumber?: number
    pageSize?: number
    q?: string
  }) => Get('/api/admin/role/list', data),

  getRoleDetail: data => Get('/api/admin/role/getPermission', data),

  getPermissionList: () => Get('/api/admin/permission/list'),

  switchRoleStatus: data => Post('/api/admin/role/enable', data),

  saveRole: data => Post('/api/admin/role/save', data),

  getAllDept: () => Get('/api/admin/unit/list'),

  // /api/admin/user/delete
  deleteRole: (data: { ids: string[] }) => Post('/api/admin/user/delete', data),

  deleteDept: (data: {
    ids: string[]
  }) => Post('/api/admin/unit/delete', data),

  saveDept: (data: {
    /* 单位ID */
    id?: string

    /* 单位名称 */
    name: string

    /* 单位父级 */
    parentId?: string

    /* 单位排序 */
    sort?: number
  }) => service.post('/api/admin/unit/save', data),

  /** 用户管理 */
  getUserList: (data: {
    pageNumber?: number
    pageSize?: number
    q?: string
    role?: string
    unitId?: string
  }) => Get('/api/admin/user/list', data),

  saveUserItem: (data: {
    /* 用户ID */
    id?: string

    /* 用户账号 */
    account: string

    /* 密码 */
    password: string

    /* 姓名 */
    name: string

    /* 单位ID */
    unitId: string

    /* 职位 */
    position?: string

    /* 用户角色 */
    role: string

    /* 用户电话号码 */
    phone?: string
  }) => service.post('/api/admin/user/save', data),

  switchUserStatus: (data: {
    /* ID */
    ids?: string[]

    /* 是否启用 */
    enabled?: boolean

    /* 是否置顶 */
    isTop?: boolean
  }) => Post('/api/admin/user/enable', data),

  deleteUserItem: (data: {
    ids: string[]
  }) => service.post('/api/admin/user/delete', data),

  resetPsw: (data: {
    id?: string
    newPassword?: string
  }) => service.post('/api/admin/user/resetPassword', data),

  /** 数据备份 */
  getBackupList: (data: {
    kind: string
  }) => Get('/api/base/backups/list', data),

  dataBackup: (data: {
    kind: string
  }) => Get('/api/base/backups/trigger', data),

  deleteBackup: (data: {
    ids: string[]
  }) => Post('/api/base/backups/delete', data),

  /** 审批流程 */
  getProcessList: () => Get('/api/process/list'),

  saveProcessItem: (data: {
    /* 流程ID */
    id?: string

    /* 流程名称 */
    name?: string

    /* 备注 */
    remark?: string

    /* 是否启用 */
    enable?: boolean

    /* 流程步骤 */
    steps?: {
      /* 步骤ID */
      id?: string

      /* 步骤名称 */
      name?: string

      /* 第几步 */
      step?: number

      /* 处理人 */
      userIds?: string[]

      /* 角色 */
      roleIds?: string[]
    }[]
  }) => service.post('/api/process/save', data),

  switchProcessStatus: (data: {
    /* ID */
    ids?: string[]

    /* 是否启用 */
    enabled?: boolean

    /* 是否置顶 */
    isTop?: boolean
  }) => service.post('/api/process/enable', data),

  getProcessDetail: (data: {
    id: string
  }) => Get('/api/process/detail', data),

  getOperationLogList: (data: {
    pageNumber: number
    pageSize: number
    q?: string
  }) => Get('/api/admin/log/list', data),
}
