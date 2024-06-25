import { number } from 'echarts'

export enum ClassificationKindEnum {
  个人档案 = 'user_archive',
  文件档案 = 'file_archive',
}

export const APIArchive = {
  getFileArchiveList: (data: {
    pageNumber: number
    pageSize: number
    categoryId?: string
    fileName?: string
    receiptTime?: string
    keyWord?: string
    textCode?: string
  }) => Get('/api/fileArchive/list', data),

  // /api/fileArchive/view
  getFileArchiveItem: (data: { id: string }) => Get('/api/fileArchive/view', data),

  // /api/userArchive/import
  importFileArchive: data => service.post('/api/fileArchive/import', data),

  deleteFileArchiveItem: (data: { ids: string[] }) => Post('/api/fileArchive/delete', data),

  importExcel: (data: {
    excel: Array<Record<string, any>>
    categoryId: string
  }) => service.post('/api/fileArchive/importExcel', data),

  saveFileArchiveItem: (data: {
    /* 文档ID */
    id?: string

    /* 文件标题 */
    title?: string

    /* 发文单位 */
    archiveUnit?: string

    /* 关键词 */
    keyword?: string

    /* 发文编号 */
    textCode?: string

    /* 发文编号 */
    receiptCode?: string

    /* 发文日期 */
    receiptTime?: string

    /* 存放位置 */
    address?: string

    /* 秘级期限 */
    secretDeadline?: string

    /* 分类ID */
    categoryId?: string

    /* 状态 */
    status?: number

    /* 密级期限的年份 */
    year?: string

    /* 是否长期 */
    isLongTerm?: boolean

    /* 附件 */
    attachments?: {
      /* 文件ID */
      id?: string

      /* 所属ID */
      withId?: string

      /* 文件名 */
      name?: string

      /* 后缀名 */
      suffix?: string

      /* 文件路径 */
      url?: string

      /* 文件大小 */
      size?: string

      /* 文件排序 */
      sort?: string

      /* 创建时间 */
      createdAt?: string

      /* 修改时间 */
      updatedAt?: string

      /* 逻辑删除 */
      isDeleted?: boolean
    }[]
  }) => service.post('/api/fileArchive/save', data),

  getFileArchiveCheck: (data: {
    id: string
  }) => Get('/api/fileArchive/check', data),

  borrowFileArchiveItem: (data: {
    /* 档案ID */
    ids?: string[]

    /* 借阅人 */
    borrowers?: string
    borrowTime?: string

    /* 单位 */
    unit?: string

    /* 备注 */
    remark?: string

    /* 文件档案id */
    fileArchiveId?: string
  }) => service.post('/api/fileArchive/borrow', data),

  getClassificationList: (data: { kind: string }) => Get('/api/category/list', data),

  getUserArchiveAllFile: (data: { userArchiveId: string }) => Get('/api/userArchive/getUserArchiveAllFile', data),

  deleteClassificationItem: (data: { ids: string[] }) => service.post('/api/category/delete', data),

  saveClassificationItem: (data: {
    id?: string
    name?: string
    cover?: string
    sort?: number
    kind?: string
  }) => service.post('/api/category/save', data),

  switchClassificationItemStatus: (data: {
    ids?: string[]
    enabled?: boolean
    isTop?: boolean
  }) => service.post('/api/category/enable', data),

  getArchiveBorrowedList: (data: {
    status: number
    pageNumber?: number
    pageSize?: number
  }) => Get('/api/fileBorrow/list', data),

  deleteArchiveBorrowedItem: (data: {
    ids?: string[]
  }) => service.post('/api/fileBorrow/delete', data),

  returnArchiveItem: (data: {
    fileArchiveId: string
    returners: string
    returnersUnit: string
    isOpenDoor: boolean
    time: string
  }) => Get('/api/fileArchive/giveback', data),

  /**
   * @description 获取归档记录年份
   * @interface /api/fileArchive/getYearList
   */
  getArchiveRecordYearList: () => Get('/api/userArchive/getReturnArchiveAllYear'),

  /**
   * @description 获取触屏端文件档案年份
   * @interface /api/fileArchive/getFileArchiveAllYear
   */
  getFileArchiveAllYear: () => Get('/api/fileArchive/getFileArchiveAllYear'),

  /**
   * @description 修改文件档案附件的文件名
   * @interface /api/fileArchive/file/update
   */
  updateFileArchiveFileName: (data: {
    id: number
    fileName: string
  }) => service.post(`/api/fileArchive/file/update?id=${data.id}&fileName=${data.fileName}`),
}
