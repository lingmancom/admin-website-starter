export const ApiAccount = {
  // 登录接口
  login: data => service.post('/api/account/login', data),

  // 获取登录用户信息
  getUserInfo: () => Get('/api/account/info'),

  // 注册接口
  register: data => service.post('/api/account/register', data),

  // 修改密码
  updatePassword: data => Post('/api/account/update', data),

  // 添加用户信息
  saveUser: data => Post('/api/admin/user/save', data),

  // 修改用户信息
  updateInfo: data => Post('/api/account/updateInfo', data),

  // 登出
  logout: data => Get('/api/account/logout', data),

  // /api/account/user/list
  getAccountUserList: data => Get('/api/account/user/list', data),

  // 获取权限列表
  getUserPermissionList: () => Get('/api/permission/user'),
}
