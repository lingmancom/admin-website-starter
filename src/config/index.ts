export enum TypeMeta {
  '计算机' = 1,
  '电子设备类' = 2,
  '图书资料类' = 3,
  '文印资料类' = 4,
}

export enum MessageTypeMeta {
  '计算机相关' = '1',
  '电子设备类相关' = '2',
  '图书资料类相关' = '3',
  '文印资料类相关' = '4',
  '用户相关' = '5',
  'IP地址申请' = '6',
}

// address_book-通讯录，special-专题，article-文章，friendship_link-友情链接，organ-机关动态，big_banner-大banner，small_banner-小banner, news-要闻
export enum KindMeta {
  '文章' = 'article',
  '友情链接' = 'friendship_link',
  '节日喜庆' = 'holiday',
  '导航' = 'navigation',
  '主页面' = 'main',
  '通知公告' = 'notice',
  '政策法规' = 'policy',
  '学习培训' = 'learn',
  '政策答疑' = 'question',
  '财经纪律' = 'finance',
  '顶部链接' = 'top',
  '底部链接' = 'bottom',
  '模版下载' = 'template',
  '人员工资' = 'salary',
}

export enum SalaryMeta {
  /**
   * 人员类别
   */
  category = '人员类别',

  /**
   * 人员姓名
   */
  name = '人员姓名',

  /**
   * 身份证号
   */
  idCard = '身份证号',

  /**
   * 结算单位
   */
  unit = '结算单位',

  /**
   * 入职时间
   */
  entryTime = '入职时间',

  /**
   * 待遇级别
   */
  salaryLevel = '待遇级别',

  /**
   * 级别
   */
  level = '级别',

  /**
   * 职务工资
   */
  positionSalary = '职务工资',

  /**
   * 工龄工资
   */
  senioritySalary = '工龄工资',

  /**
   * 应发工资
   */
  payableSalary = '应发工资',

  /**
   * 伤保
   */
  injuryInsurance = '伤保',

  /**
   * 税收
   */
  taxation = '税收',

  /**
   * 房租
   */
  rent = '房租',

  /**
   * 医保
   */
  additionalMedicalInsurance = '医保',

  /**
   * 伙食费
   */
  boardExpenses = '伙食费',

  /**
   * 水电费
   */
  waterAndElectricity = '水电费',

  /**
   * 物业费
   */
  property = '物业费',

  /**
   * 公积金
   */
  accumulationFund = '公积金',

  /**
   * 养老保险
   */
  endowmentInsurance = '养老保险',

  /**
   * 职业年金
   */
  occupationalAnnuity = '职业年金',

  /**
   * 医疗保险
   */
  medicalInsurance = '医疗保险',

  /**
   * 失业保险
   */
  unemploymentInsurance = '失业保险',

  /**
   * 扣发
   */
  withholding = '扣发',

  /**
   * 实发工资
   */
  netSalary = '实发工资',
};

// draft:草稿 publish:发布
export enum PublishStatusMeta {
  '草稿' = 'draft',
  '发布待审核' = 'publish',
  '审核通过' = 'pass',
  '审核拒绝' = 'reject',
  '删除' = 'delete',
  '预览' = 'preview',
}

// FOLDER("folder","文件夹"),
// FILE("file","文件"),
// PPT("ppt","PPT文件"),
// DOC("doc","DOC文件"),
// JPG("jpg","JPG文件"),
// UNKNOWN("unknown","未知文件类型"),
// TXT("txt","JPG文件"),
// MP4("mp4","视频文件"),
// ZIP("zip","压缩文件"),
// XLSX("xlsx","excel文件"),
// PDF("pdf","pdf文件"),

export enum FileKindMeta {
  '文件夹' = 'folder',
  '文件' = 'file',
  'PPT文件' = 'ppt',
  'DOC文件' = 'doc',
  'JPG文件' = 'jpg',
  '未知文件类型' = 'unknown',
  'TXT文件' = 'txt',
  '视频文件' = 'mp4',
  '压缩文件' = 'zip',
  'excel文件' = 'xlsx',
  'pdf文件' = 'pdf',
}
