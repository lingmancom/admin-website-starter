<script setup lang="ts">
import { documentTypeMap } from '@/config'

const route = useRoute()

onMounted(() => {
  const url = decodeURIComponent(route.query.url as string)
  const title = decodeURIComponent(route.query.title as string)
  const fileType = url.split('.').pop()

  const documentType = Object.keys(documentTypeMap).find(key => documentTypeMap[key].includes(fileType))
  console.log(documentType)

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
})
</script>

<template>
  <div class="w-full h-full">
    <div id="viewDocEditor"></div>
  </div>
</template>
