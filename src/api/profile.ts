export enum ArchiveStatusEnum {
  正常 = 1,
  临时档案,
  已归档,
}

export const APIProfile = {
  getProfileClassificationList: (data: { id: string }) => Get('/api/userArchive/getCategory', data),

  // /api/userArchive/getReturnArchiveCategorys
  getReturnProfileClassificationList: (data: {
    userArchiveId: string
    year: string
  }) => Get('/api/userArchive/getReturnArchiveCategorys', data),

  // /api/userArchive/getReturnArchiveFiles
  getReturnProfileFileList: (data: {
    userArchiveId: string
    categoryId: string
    year: string
  }) => Get('/api/userArchive/getReturnArchiveFiles', data),

  saveStatistics: (data: {
    id?: string
    educationalLevel?: any
    militaryServiceStatus?: any
    politicalOutlook?: any
    natureOfWorkUnit?: any
  }) => service.post('/api/statistical/save', data),

  // /api/userArchive/upload
  uploadProfileItem: data => Post('/api/userArchive/upload', data),

  // /api/userArchive/deleteFile
  deleteProfileItemFile: data => Post('/api/userArchive/deleteFile', data),

  // /api/statistical/get
  getStatistics: data => Get('/api/statistical/get', data),

  // /api/userArchive/getDetail
  getProfileItemDetail: data => Get('/api/userArchive/getDetail', data),

  getProfileList: (data: { pageNumber?: number, pageSize?: number, status?: string }) => Get('/api/userArchive/list', data),

  /**
   * @description 查询不是当年的归档记录列表
   * @interface /api/userArchive/getReturnArchiveByYear
   */
  getReturnProfileListByYear: (data: { pageNumber?: number, pageSize?: number, status?: string }) => Get('/api/userArchive/getReturnArchiveByYear', data),

  transferProfileItem: (data: { ids: string[] }) => service.post('/api/userArchive/transfer', data),

  returnProfileItem: (data: { ids: string[] }) => service.post('/api/userArchive/archive', data),

  deleteIndividualProfileItem: (data: { ids: string[] }) => service.post('/api/userArchive/delete', data),

  /** 查询归档记录列表 */
  getReturnProfileList: (data: { q: string }) => Get('/api/userArchive/listArchived', data),

  /** 删除归档记录项 {id 是年份} */
  deleteReturnProfileItem: (data: { ids: string[] }) => service.post('/api/userArchive/deleteArchived', data),

  deleteProfileItem: (data: { ids: string[] }) => service.post('/api/userArchive/delete', data),

  recoverProfileItem: (data: { ids: string[] }) => service.post('/api/userArchive/recover', data),

  saveProfileItem: (data: {
    /* ID */
    id?: string

    /* 姓名 */
    name?: string

    /* 身份证号码 */
    idCard?: string

    /* 单位 */
    unit?: string

    /* 附件 */
    attachments?: {
      /* 附件ID */
      id?: string

      /* 附件名称 */
      name?: string

      /* 附件地址 */
      url?: string

      /* 附件后缀 */
      suffix?: string

      /* 附件大小 */
      size?: Record<string, unknown>

      /* 保存分类ID */
      categoryId?: string
    }[]
  }) => service.post('/api/userArchive/save', data),

  /**
   * @description 修改个人档案附件的文件名
   * @interface /api/fileArchive/file/update
   */
  updateUserArchiveFileName: (data: {
    id: number
    fileName: string
  }) => service.post(`/api/userArchive/file/update?id=${data.id}&fileName=${data.fileName}`),
}
