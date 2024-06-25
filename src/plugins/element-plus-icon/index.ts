import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElButton, ElCheckbox, ElDatePicker, ElDialog, ElForm, ElInput, ElOption, ElOverlay, ElScrollbar, ElSelect, ElTable, ElTableColumn, ElTreeSelect } from 'element-plus'
import ElFormItem from '@/components/ElFormItem.vue'
import 'element-plus/theme-chalk/el-date-picker.css'
import 'element-plus/theme-chalk/el-form.css'
import 'element-plus/theme-chalk/el-input.css'
import 'element-plus/theme-chalk/el-option.css'
import 'element-plus/theme-chalk/el-select.css'
import 'element-plus/theme-chalk/el-tree-select.css'
import 'element-plus/theme-chalk/el-form-item.css'
import 'element-plus/theme-chalk/el-checkbox.css'
import 'element-plus/theme-chalk/el-table.css'
import 'element-plus/theme-chalk/el-table-column.css'
import 'element-plus/theme-chalk/el-dialog.css'
import 'element-plus/theme-chalk/el-overlay.css'

export function loadElementPlusIcon(app: App) {
  /** 注册所有 Element Plus Icon */
  for (const [key, component] of Object.entries(ElementPlusIconsVue))
    app.component(key, component)
}

export function loadElementPlusComponents(app: App) {
  for (const component of [ElInput, ElForm, ElFormItem, ElSelect, ElOption, ElTreeSelect, ElDatePicker, ElTable, ElTableColumn, ElButton, ElScrollbar, ElCheckbox, ElDialog, ElOverlay])
    app.component(component.name, component)
}
