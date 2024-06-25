import type { App } from 'vue'
import { loadElementPlusComponents, loadElementPlusIcon } from './element-plus-icon'

export function loadPlugins(app: App) {
  loadElementPlusIcon(app)
  loadElementPlusComponents(app)
}
