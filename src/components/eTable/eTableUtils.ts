import type { ElTableColumn } from 'element-plus'

export type colConfig = Partial<(Parameters<Exclude<(typeof ElTableColumn)['setup'], undefined>>[0]) & { customRender: (...args: any[]) => VNode }>

/** 纯函数 */
export function setColsConfig(colConfigs: colConfig[], config: Record<string, any>) {
  return colConfigs.map((item) => {
    return { ...config, ...item }
  })
}
