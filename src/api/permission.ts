export const APIPermission = {
  getPermissionTree: () => Get('/api/admin/permission/list'),

  savePermissionItem: (data: any) => service.post('/api/admin/permission/save', data),

  deletePermissionItem: (data: any) => service.post('/api/admin/permission/delete', data),

  /** 获取角色权限 */
  getPermissionByRoleId: (data: any) => Get('/api/admin/permission/getByRole', data),

  /** 保存角色权限 */
  saveRolePermission: (data: {
    /* roleId */
    id?: string

    /* 角色名 */
    name?: string

    /* 角色描述 */
    description?: string

    /* 启用状态 */
    enabled?: boolean

    /* 权限列表 */
    permissions?: Record<string, unknown>[]
  }) => service.post('/api/role/save', data),

  /** 获取角色列表 */
  getRoleList: data => Get('/api/admin/role/list', data),

  /** 删除角色 */
  deleteRole: (data: {
    ids: string[]
  }) => Post('/api/admin/role/delete', data),

  /** 获取当前用户的权限列表 */
  getPermissionListByUser: () => Get('/api/admin/permission/getUserPermission'),

  saveRole: (data: {
    /* roleId */
    id?: string

    /* 角色名 */
    name?: string

    /* 角色描述 */
    description?: string

    /* 启用状态 */
    enabled?: boolean

    /* 权限列表 */
    permissions?: Record<string, unknown>[]
  }) => service.post('/api/admin/role/save', data),

}
