export interface itemConfig {
  prop: string
  label: string
  kind: 'input' | 'select' | 'textarea' | 'date' | 'time' | 'datetime'
  rules?: any
  selectOptions?: any[]
}
