export const Api = {
  // /api/system/version
  getVersion: () => Get('/api/system/version'),

  home: () => Get('/home'),

  // /api/admin/unit/list
  getUnitList: () => Get('/api/admin/unit/list'),

  // /api/admin/unit/delete
  deleteUnit: data => Post('/api/admin/unit/delete', data),

  // /api/userArchive/getReturnArchiveUnitList
  getReturnArchiveUnitList: (
    data: {
      year: string
    },
  ) => Get('/api/userArchive/getReturnArchiveUnitList', data),

  // /api/admin/unit/save
  saveUnit: data => Post('/api/admin/unit/save', data),

  // /api/admin/user/list
  getUserList: data => Get('/api/admin/user/list', data),

  getUserListByUnitId: (data: { id: string }) => Get('/api/admin/user/userList', data),

  // /api/admin/user/save
  saveUser: data => Post('/api/admin/user/save', data),

  // /api/admin/user/delete
  deleteUser: data => Post('/api/admin/user/delete', data),

  // /api/system/save
  saveSystem: data => Post('/api/system/save', data),

  // /api/system/get
  getSystem: () => Get('/api/system/get'),

  // /api/account/changePassword
  changePassword: data => Post('/api/account/changePassword', data),

  // /api/public/scan
  scan: () => service.get('/api/public/scan', { timeout: 1000000000 }),
}
