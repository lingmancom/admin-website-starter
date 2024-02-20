<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'

// 引入 css
import { uploadFile } from '@/utils/upload'
import { KindMeta, PublishStatusMeta } from '@/config'
import { handleScroll, windowOpen } from '@/utils'

const router = useRouter()
const route = useRoute()

const loading = ref(false)

const typeCategory = useCURDCategory({
  kind: route.query.kind as any,
  getParams: { level: 1 },
})

if (route.query.kind)
  typeCategory.loadData()

console.log(route.query.item)
const { item, save, loadDetail } = useCURDArticle({
  item: {
    editor: '',
  },
  postSave: async (data, { publishKind }) => {
    if (publishKind === PublishStatusMeta.预览) {
      windowOpen('/detail', { id: data })
      return
    }
    ElMessage.success('保存成功')
    if (data)
      router.back()
  },
  preSave: async (data) => {
    if (!item.title) {
      ElMessage.warning('请输入标题')
      return false
    }

    if (item.outLink) {
      if (!item.link) {
        ElMessage.warning('请输入外链地址')
        return false
      }
    }

    if (!item.unitId) {
      ElMessage.warning('请选择供稿单位')
      return false
    }

    if (!item.editor) {
      ElMessage.warning('请输入编辑')
      return false
    }
    // if (!item.cover) {
    //   ElMessage.warning('请上传封面')
    //   return false
    // }

    return data
  },
  loadDataOnSave: false,
  clearItemOnSave: false,
  showMessage: false,
})

Object.assign(item, route.query)

if (route.query.id)
  loadDetail()

function singleUploadAttrs() {
  return {
    action: '#',
    showFileList: false,
    accept: 'image/*',
    onChange: async (file) => {
      loading.value = true
      const res = await uploadFile(file.raw)
      item.cover = res.fileUrl
      loading.value = false
    },
    autoUpload: false,
  }
}

const unitList = ref([])

async function getUnitList() {
  unitList.value = await Api.getUnitList()
}

getUnitList()

const handelSave = debounce(save, 1000, true)
</script>

<template>
  <el-card body-class="h-full">
    <el-scrollbar id="editor-scrollbar" @scroll="handleScroll">
      <div class="flex justify-between pr-10">
        <div class="">
          <el-button type="primary" size="small" @click="router.back()">
            返回
          </el-button>
        </div>
        <!-- <div>{{ item.category || item.kindName }}</div> -->
        <div class="">
          <el-button
            v-if="!item.outLink" type="primary" size="small"
            @click="handelSave({ publishKind: PublishStatusMeta.预览 })"
          >
            预览
          </el-button>
          <!-- <el-button
            v-if="!item.outLink" type="primary" size="small"
            @click="handelSave({ publishKind: PublishStatusMeta.草稿 })"
          >
            保存
          </el-button> -->
          <el-button type="primary" size="small" @click="handelSave({ publishKind: PublishStatusMeta.审核通过 })">
            保存并发布
          </el-button>
        </div>
      </div>
      <div class="flex">
        <div class="p20 flex-1">
          <edit-row
            v-model="item.categoryId" required title="发布位置" placeholder="请选择类型" width="100%" type="select" :options="typeCategory.tableData.value.map(i => ({
              label: i.name,
              value: i.id,
            }))"
          ></edit-row>
          <edit-row v-model="item.title" required title="标题" placeholder="请输入文章标题" width="100%"></edit-row>
          <div class="flex items-center mb-10">
            <edit-row
              v-model="item.link" :required="item.outLink" :disabled="!item.outLink" title="外链" width="100%"
              class="flex-1 !mb0 "
            ></edit-row>
            <el-checkbox v-model="item.outLink" class="ml-20">添加 </el-checkbox>
          </div>
          <div v-if="!item.outLink" class="flex">
            <div class="flex mb20">
              <edit-row
                v-model="item.unitId" placeholder="请选择供稿单位" type="select" required title="供稿单位" class="!mb0 mr20 w-300"
                width="100%" :options="unitList.map(i => ({ label: i.name, value: i.id }))"
              ></edit-row>
              <edit-row v-model="item.editor" required title="编辑" clearable title-width="70" width="100%" class="!mb0 mr20 w-300" placeholder="请输入编辑"></edit-row>
              <edit-row v-if="route.query.kind === KindMeta.政策法规" v-model="item.releaseTime" title-width="80" required title="法规年度" clearable width="100%" class="!mb0 mr20 w-300" placeholder="请输入法规年度"></edit-row>
            </div>
          </div>
        </div>
        <div class="ml-50 p-20">
          <div v-if="item.cover" class="relative fc">
            <svg-icon name="Close" class="fwbold !absolute top-0 right-0 cp z-1" @click="item.cover = ''"></svg-icon>
            <el-image
              v-if="item.cover" class="w-120 h-120" :src="item.cover" :hide-on-click-modal="true"
              :preview-teleported="true" :preview-src-list="[item.cover]"
            />
          </div>
          <el-upload v-else v-bind="singleUploadAttrs()">
            <div
              v-loading="loading" class="w-120 h-120 flex flex-col items-center justify-center"
              border="1 #e5e5e5 dashed"
            >
              <svg-icon name="Plus" />
              <div>上传封面</div>
            </div>
          </el-upload>
        </div>
      </div>

      <WangEditor
        v-if="!item.outLink" v-model="item.content" class="m10 mt-0 h-1000"
        @upload-image="(res) => item.cover = (item.cover ? item.cover : res)"
      ></WangEditor>
    </el-scrollbar>
  </el-card>
</template>

<style lang='scss' scoped></style>
