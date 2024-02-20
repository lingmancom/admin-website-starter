export default {

  title: window.__TITLE,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  showSettings: false,
}

// 1：超级管理员 2：管理员 4：普通用户
export const RoleMeta = {
  1: '超级管理员',
  2: '管理员',
  4: '普通用户',
}

export enum ArticleStatusType {
  /**
   * 未审核，审核中
   */
  PUBLISH = 'publish',

  /**
   * 审核通过
   */
  PASS = 'pass',

  /**
   * 审核不通过
   */
  REJECT = 'reject',

  /**
   * 未发布, 草稿箱
   */
  DRAFT = 'draft',

}