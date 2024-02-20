export interface IHome {
  topLink: any[]
  notice: Notice[]
  learn: Learn[]
  financialSupervision: string
  policyRegulations: PolicyRegulation[]
  financialDiscipline: FinancialDiscipline[]
  policyAnswer: PolicyAnswer[]
  adviceCount: string
  hotAnswer: HotAnswer[]
  templateDownload: TemplateDownload[]
  bottomLink: BottomLink[]
  categoryMap: CategoryMap
}

export interface Notice {
  id: string
  cover: string
  title: string
  createdAt: string
  isNew: boolean
}

export interface Learn {
  id: string
  cover: string
  title: string
  createdAt: string
  isNew: boolean
}

export interface PolicyRegulation {
  id: string
  cover: string
  title: string
  createdAt: string
  isNew: boolean
}

export interface FinancialDiscipline {
  id: string
  cover: string
  title: string
  createdAt: string
  isNew: boolean
}

export interface PolicyAnswer {
  id: string
  title: string
  content: string
  categoryId: string
  kind: any
  createdAt: string
  viewNum: string
}

export interface HotAnswer {
  id: string
  cover: string
  title: string
  createdAt: string
  isNew: boolean
}

export interface TemplateDownload {
  id: string
  name: string
  description: string
  url: string
  sort: number
  categoryId: string
  kindName: string
  suffix: string
  status: boolean
  count: number
  top: boolean
  createdBy: string
  createdAt: string
}

export interface BottomLink {
  id: string
  icon: string
  title: string
  url: string
}

export interface CategoryMap {
  template: Template[]
  question: Question[]
  policy: Policy[]
}

export interface Template {
  id: string
  name: string
}

export interface Question {
  id: string
  name: string
}

export interface Policy {
  id: string
  name: string
}
