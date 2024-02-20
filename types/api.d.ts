/** 所有 api 接口的响应数据都应该准守该格式 */
interface ApiResponseData<T> {
  code: number
  data: T
  message: string
}

interface LoginRequestData {
  account: string
  password: string
}

interface LoginUserInfo {
  username: string
  password: string
  roles: string[]
}

interface registerRequestData {
  name: string
  secretRank: number
  userUnit: number
  userType: number
  postType: number
  departmentalRank: number
  militaryRank: number
  phoneNumber: string
  officeAddress: string
  username: string
  password: string
  second_password: string
  enabled: boolean
}

// 用户管理用户信息
interface UserInfo {
  id: number
  name: string
  secretRank: number
  userUnit: number
  userType: number
  postType: number
  phoneNumber: string
  officeAddress: string
  username: string
  password: string
  enabled: boolean
}

// 角色信息
interface roleInfo {
  id: number
  name: string
  description: string
  enabled: boolean
}

// 流程信息
interface ProcessInfo {
  id: number
  check_type: number
  description?: any
  enabled: boolean
  process_name?: any
  start_time: string
  end_time?: any
}

export interface INavigation {
  主页面: GeneratedType[]
  网址导航: any[]
}

export interface GeneratedType {
  id: string
  title: string
  link: string
  categoryId: string
  kind: any
  note: any
  status: boolean
  count: string
  cover?: string
  sort: number
  createdBy: any
  createdAt: string
  updatedAt: string
}

export interface IFriendshipLinks {
  name: string
  links: Link[]
  cover: string
}

export interface Link {
  id: string
  title: string
  link: string
  kind: string
  cover: any
  note: any
  status: boolean
  count: string
  sort: number
  createdBy: string
  createdAt: string
  updatedAt: string
  deletedAt: any
}
