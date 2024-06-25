import { ElDialog } from 'element-plus'
import type { VNode } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const modalList = ref<VNode[]>([])

  function addModal(fc: VNode) {
    modalList.value.push(fc)
  }

  function removeModal() {
    modalList.value.pop()
  }

  return {
    modalList,
    addModal,
    removeModal,
  }
})

type AnyFuncType = (...args: any[]) => any
type AsyncFuncType = (...args: any[]) => Promise<any>

type ContentParams<T> = {
  [key in keyof T]: T[key] & { loading: Ref<boolean> }
} & {
  onOk?: AsyncFuncType & { loading: Ref<boolean> }
  onCancel?: AsyncFuncType & { loading: Ref<boolean> }
  close: () => void
}

interface OpenType<T> {
  title: string | Function | VNode
  asyncFuncs?: T extends Record<string, AsyncFuncType> ? T : any
  content: ((params: ContentParams<T>) => VNode) | VNode
  footer?: ((params: ContentParams<T>) => VNode) | VNode
  onOk?: AsyncFuncType
  onCancel?: AsyncFuncType
  beforeClose?: AnyFuncType
  attrs?: Record<string, any>
}

function genLoadingFunc<T extends AsyncFuncType>(func: T): T & { loading: Ref<boolean> } {
  const loading = ref(false)

  const fn = (async (...args: Parameters<T>) => {
    loading.value = true
    let ret: ReturnType<T> extends Promise<infer R> ? R : Promise<any>
    try {
      await func(...args)
    }
    catch (e) {
      console.log('e', e)
      loading.value = false
      if (typeof e === 'object') ElMessage.error('请检查输入')
      else ElMessage.error(e)
    }
    loading.value = false

    return ret
  }) as T & { loading: Ref<boolean> }

  fn.loading = loading

  return fn
}

function genLoadingFuncs<T extends Record<string, AsyncFuncType>>(asyncFuncs: T) {
  const retObj = {} as ContentParams<T>

  const keys = Object.keys(asyncFuncs)

  keys.forEach((key: keyof ContentParams<T>) => {
    retObj[key] = genLoadingFunc(asyncFuncs[key]) as any
  })

  return retObj
}

export function useModal() {
  const modalStore = useModalStore()

  function remove() {
    modalStore.removeModal()
  }

  return {
    open<T>(prop: OpenType<T>) {
      console.log('prop', prop)

      const passParam = { close() {
        typeof prop.beforeClose === 'function' && prop.beforeClose()

        remove()
      } } as ContentParams<T>

      if (typeof prop.onOk === 'function') {
        passParam.onOk = genLoadingFunc(async (...args) => {
          await prop.onOk(...args)
          remove()
        })
      }
      if (typeof prop.onCancel === 'function') passParam.onCancel = genLoadingFunc(prop.onCancel)

      if (Object.keys(prop.asyncFuncs || {})) Object.assign(passParam, genLoadingFuncs(prop.asyncFuncs || {}))

      const headerFC = typeof prop.title === 'function' ? prop.title : () => prop.title
      const defaultFC = typeof prop.content === 'function' ? prop.content : () => prop.content
      const footerFC = typeof prop.footer === 'function' ? prop.footer : () => prop.footer

      modalStore.addModal(
        <ElDialog modelValue={true} onClose={remove} {...prop.attrs}>
          {{
            header: () => headerFC(passParam),
            default: () => defaultFC(passParam),
            footerFC: () => footerFC(passParam) || <></>,
          }}
        </ElDialog>,
      )
    },
  }
}
