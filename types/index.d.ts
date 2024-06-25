declare interface Math {
  easeInOutQuad: Function
}
declare interface Window {
  mozRequestAnimationFrame: any
  __BASE_API: string
  __NET_DISK: string
  __VIDEO_API: string
  __CRAWL_API: string
  __FAST_API: string
  __BIG_SCREEN: string
  __TITLE: string
  __IS_QY_LOGIN: boolean
  __browser_32: string
  __browser_64: string
  __PREVIEW_ADDRESS: string
  __DOOR_API_ADDRESS: string
  parsePostAddress: function
  docEditor: any
  onresize: () => void
}
declare interface Screen {
  left: number
  top: number
}
declare interface ParentNode {
  scrollTop: number
}

declare let $store: Store<AppStore>

type Component<T = any> =
  | ReturnType<typeof import('vue')['defineComponent']>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

interface Menu {
  url: string
  title: string
  icon?: string
  children?: Menu[]
}

interface RouteMeta {
  title: string
  hidden?: boolean
  affix?: boolean
}

interface Recordable {
  error: string
}

interface AppRouterRaw {
  path: string
  name: string
  meta: RouteMeta
  component?: Component | string
  components?: Component
  children?: AppRouterRaw[]
  props?: Recordable
  icon?: string
  fullPath?: string
  beforeEnter?: () => string | boolean
}

type DataType<T extends (...args: any[]) => any> = Parameters<T>[0]

type ListItemType<T extends (...args: any[]) => any> = ReturnType<T>['data']['data'][0]

interface Ws<T> {
  action: string
  data: T | any
}

interface PageSettings {
  pageSize: number
  pageNumber: number
  q?: string
}

interface Pagination<T> {
  data: T[]
  pageNumber: number
  pageSize: number
  totalCount: number
}
