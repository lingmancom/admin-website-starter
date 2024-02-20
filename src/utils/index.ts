import dayjs from 'dayjs'
import print from 'print-js'
import { removeConfigLayout } from '@/utils/cache/local-storage'
import router from '@/router'

/** 格式化时间 */
export function formatDateTime(time: string | number | Date) {
  return time ? dayjs(new Date(time)).format('YYYY-MM-DD HH:mm:ss') : 'N/A'
}

/** 用 JS 获取全局 css 变量 */
export function getCssVariableValue(cssVariableName: string) {
  let cssVariableValue = ''
  try {
    // 没有拿到值时，会返回空串
    cssVariableValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariableName)
  }
  catch (error) {
    console.error(error)
  }
  return cssVariableValue
}

/** 用 JS 设置全局 CSS 变量 */
export function setCssVariableValue(cssVariableName: string, cssVariableValue: string) {
  try {
    document.documentElement.style.setProperty(cssVariableName, cssVariableValue)
  }
  catch (error) {
    console.error(error)
  }
}

/** 重置项目配置 */
export function resetConfigLayout() {
  removeConfigLayout()
  location.reload()
}

export async function toLogin(next?) {
  if (window.__IS_QY_LOGIN) {
    const urlObj = new URL(window.location.href)
    const url = `${urlObj.origin}/#/qylogin?url=${encodeURIComponent(urlObj.href)}&t=`
    window.open(`https://company.lingman.tech/#/login?url=${encodeURIComponent(url)}`, '_self')
  }
  else {
    if (next)
      next('/login')
    else
      router.push('/login')
  }
}

export function printTable(id, options = {}) {
  const isDev = import.meta.env.DEV

  const data = {
    printable: id,
    type: 'html',
    ...options,
    showModal: true,
  } as any

  if (isDev) {
    data.style = Array.from(document.querySelectorAll('style')).reduce((prev, cur) => {
      return prev + cur.textContent
    }, '')
  }
  else {
    data.css = Array.from(document.querySelectorAll('link')).filter(i => i.rel === 'stylesheet').map(i => i.href)
  }

  print(data)
}

export function mmToPx(mm) {
  // 获取屏幕每英寸像素密度（DPI）
  const dpi = getDeviceDpi() || 96 // 默认DPI为96

  // 将毫米转换为英寸
  const inch = mm / 25.4

  // 将英寸转换为像素
  const px = inch * dpi

  return px
}

// 获取设备dpi的函数
export function getDeviceDpi() {
  // 创建一个隐藏的div元素
  const div = document.createElement('div')
  div.style.width = '1in'

  // 将div添加到body中
  const body = document.getElementsByTagName('body')[0]
  body.appendChild(div)

  // 获取div的宽度，即1英寸的像素数
  const dpi = div.offsetWidth

  // 删除div并返回dpi值
  body.removeChild(div)
  return dpi
}

export function windowOpen(url, obj?) {
  if (!url)
    window.open(`${window.location.origin}/${window.location.hash ? '#' : ''}/404`)
  if (url.startsWith('http')) {
    window.open(url)
  }
  else {
    const routeData = router.resolve({
      path: url,
      query: obj,
    })
    window.open(routeData.href, '_blank')
  }
}

export function handleScroll() {
  const scrollbar = document.querySelector('#editor-scrollbar') as HTMLElement
  const toolbar = document.querySelector('.w-e-toolbar') as HTMLElement

  const container = document.querySelector('.w-e-text-container') as HTMLElement

  const containerTop = container.getBoundingClientRect().top

  // 获取toolbar的位置
  const toolbarH = toolbar.getBoundingClientRect().height
  // 获取滚动条的位置
  const scrollbarTop = scrollbar.getBoundingClientRect().top

  // const paddingTop = Number.parseFloat(getComputedStyle(scrollbar.parentNode as any).getPropertyValue('padding'))

  if (containerTop <= scrollbarTop + toolbarH)
    addClass(toolbar, 'editor-toolbar-fixed')

  else
    removeClass(toolbar, 'editor-toolbar-fixed')
}
