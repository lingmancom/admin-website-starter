/* eslint-disable unused-imports/no-unused-vars */
import { FileCoverMeta, FileKindMeta, documentTypeMap } from '@/config'
import ExcelPreview from '@/components/excelPreview/index.vue'

export function parseItem(item: any) {
  const suffix = item.suffix
  // 如果是图片直接返回url
  if (suffix === '.jpg' || suffix === '.png' || suffix === '.jpeg') {
    return {
      url: item.url,
      type: FileKindMeta.IMAGE,
    }
  }

  return {
    url: FileCoverMeta.filter(v => v.reg.test(suffix))[0].img,
  }
}

const previewStore = PreviewStore()

export async function previewFile(file) {
  if (file === undefined) return ElMessage.warning('暂无可查看文件')

  if (FileCoverMeta.filter(v => v.reg.test(file.suffix))[0].kind === FileKindMeta.IMAGE)
    return previewStore.openImageViewer({ url: file?.url })

  if ([FileKindMeta.DOC文件, FileKindMeta.excel文件, FileKindMeta.pdf文件].includes(FileCoverMeta.filter(v => v.reg.test(file.suffix))[0].kind)) {
    // previewModel((`/#/view_word?title=${encodeURIComponent(file.name)}&url=${encodeURIComponent(file.url)}`))

    if ([FileKindMeta.pdf文件].includes(FileCoverMeta.filter(v => v.reg.test(file.suffix))[0].kind)) previewFileOld(file)
    else if ([FileKindMeta.excel文件].includes(FileCoverMeta.filter(v => v.reg.test(file.suffix))[0].kind)) previewModelExcel((file.url), (file.name))

    else previewModel((file.url), (file.name))
  }

  else { ElMessage.error('暂不支持预览该格式文件') }
}

export async function previewFileOld(file) {
  if (file === undefined) {
    ElMessage.error('暂无可查看文件')
    return
  }
  previewModelOld((file.url), (file.name))
}

export function previewModel(url, title) {
  // const route = useRoute()

  const mRef = ref(null)

  watch(mRef, (el) => {
    if (el) {
      const fileType = url.split('.').pop()

      const documentType = Object.keys(documentTypeMap).find(key => documentTypeMap[key].includes(fileType))
      console.log('documentType', documentType)

      // @ts-expect-error xxxx
      const viewDocEditor = new DocsAPI.DocEditor('viewDocEditor', {
        document: {
          fileType,
          key: `docx${Math.random()}`,
          title,
          url,
          user: {
            id: 'anonymous',
            name: 'Anonymous',
          },
        },
        documentType: documentType === 'pdf' ? 'word' : documentType,
        editorConfig: {
          mode: 'view',
          lang: 'zh-CN',
        },
        height: '100%',
        width: '100%',
      })

      console.log(viewDocEditor)
    }
  })

  useModal().open({
    attrs: {
      class: 'min-w-1000 min-h-90vh',
      top: '5vh',
      // modalClass: 'bg-white',
    },
    title: `预览`,
    content() {
      return (
        <>
          {/* <iframe key={url} src={url} class="w-full h-80vh" frameborder="0"></iframe> */}
          <div class="w-full  h-[calc(90vh-67px)]">
            <div ref={mRef} id="viewDocEditor"></div>
          </div>
        </>
      )
    },
  })
}

function processPdfPreviewUrl(path) {
  const fileUrl = '/pdfjs/web/viewer.html'
  return `${fileUrl}?file=${encodeURIComponent(path)}`
}

export function previewModelOld(url, title) {
  // const previewUrl = processPdfPreviewUrl(url)
  // const previewUrl = `${window.parsePostAddress(window.__PREVIEW_ADDRESS)}/onlinePreview?url=${(btoa(encodeURIComponent(url)))}`
  useModal().open({
    attrs: {
      class: 'min-w-1000 min-h-90vh',
      top: '5vh',
      // modalClass: 'bg-white',
    },
    title,
    content() {
      return (
        <>
          {/* <iframe key={previewUrl} src={previewUrl} class="w-full h-80vh" frameborder="0"></iframe> */}
          <PdfObject
            class="h-80vh"
            url={url}
            options={{ page: 2 }}
          />
        </>
      )
    },
  })
}

export function previewModelExcel(url, title) {
  // const previewUrl = processPdfPreviewUrl(url)
  // const previewUrl = `${window.parsePostAddress(window.__PREVIEW_ADDRESS)}/onlinePreview?url=${(btoa(encodeURIComponent(url)))}`
  useModal().open({
    attrs: {
      class: 'min-w-1000 min-h-90vh flex flex-col',
      top: '5vh',
      // modalClass: 'bg-white',
    },
    title,
    content() {
      return (
        <>
          <ExcelPreview link={url}></ExcelPreview>
        </>
      )
    },
  })
}
