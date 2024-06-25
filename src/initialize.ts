/* eslint-disable unused-imports/no-unused-vars */
import type { IButtonMenu, IDomEditor } from '@wangeditor/editor'
import { Boot } from '@wangeditor/editor'
import attachmentModule from '@wangeditor/plugin-upload-attachment'
import { useUserStore } from '@/store/modules/user'

Object.assign(cfg.request, {
  getApiRoot: () => {
    let address

    if (window.__BASE_API.startsWith('http'))
      address = window.__BASE_API

    else
      address = `${window.location.protocol}//${window.location.hostname}${window.__BASE_API}`

    return address
  },
  getHttpHeader: () => {
    const accountStore = useUserStore()
    return {
      token: accountStore.token || '',
    }
  },
  makeLogout: () => {
    // 清除token
    const accountStore = useUserStore()
    accountStore.logout()
  },
  showErrorToast: (msg: string) => ElMessage.error(msg),
})

// wangeditor 配置
Boot.registerMenu({
  key: 'openImageSource', // 菜单唯一标识，可选
  factory() {
    return new class MyButtonMenu implements IButtonMenu {
      title: string
      tag: string
      constructor() {
        this.title = '图片资源库' // 自定义菜单标题
        // this.iconSvg = '<svg>...</svg>' // 可选
        this.tag = 'button'
      }

      // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
      getValue(editor: IDomEditor): string | boolean {
        return ' hello '
      }

      // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
      isActive(editor: IDomEditor): boolean {
        return false
      }

      // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
      isDisabled(editor: IDomEditor): boolean {
        return false
      }

      // 点击菜单时触发的函数
      exec(editor: IDomEditor, value: string | boolean) {
        if (this.isDisabled(editor))
          return
        editor.emit('show-source', 'image')
      }
    }()
  }, // 菜单对应的 class ，可选
})

Boot.registerMenu({
  key: 'openVideoSource', // 菜单唯一标识，可选
  factory() {
    return new class MyButtonMenu implements IButtonMenu {
      title: string
      tag: string
      constructor() {
        this.title = '视频资源库' // 自定义菜单标题
        // this.iconSvg = '<svg>...</svg>' // 可选
        this.tag = 'button'
      }

      // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
      getValue(editor: IDomEditor): string | boolean {
        return ' hello '
      }

      // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
      isActive(editor: IDomEditor): boolean {
        return false
      }

      // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
      isDisabled(editor: IDomEditor): boolean {
        return false
      }

      // 点击菜单时触发的函数
      exec(editor: IDomEditor, value: string | boolean) {
        if (this.isDisabled(editor))
          return
        editor.emit('show-source', 'video')
      }
    }()
  }, // 菜单对应的 class ，可选
})

Boot.registerModule(attachmentModule)

Boot.registerMenu({
  key: 'fujian', // 菜单唯一标识，可选
  factory() {
    return new class MyButtonMenu implements IButtonMenu {
      title: string
      tag: string
      constructor() {
        this.title = '上传附件' // 自定义菜单标题
        // this.iconSvg = '<svg>...</svg>' // 可选
        this.tag = 'button'
      }

      // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
      getValue(editor: IDomEditor): string | boolean {
        return ' hello '
      }

      // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
      isActive(editor: IDomEditor): boolean {
        return false
      }

      // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
      isDisabled(editor: IDomEditor): boolean {
        return false
      }

      // 点击菜单时触发的函数
      exec(editor: IDomEditor, value: string | boolean) {
        if (this.isDisabled(editor))
          return
        editor.emit('upload-fujian', 'video')
      }
    }()
  }, // 菜单对应的 class ，可选
})
