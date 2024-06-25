<script setup lang="ts">
import { uploadFile } from '@/utils/upload'

const globalStore = useGlobalDataStore()
const system = globalStore.system
const getSystem = globalStore.getSystem

const count = ref(1)

async function save() {
  await Api.saveSystem(system)
  ElMessage.success('保存成功')
  getSystem()
}

async function fileChange(file, name) {
  // 限制文件不能超过2M
  if (file.raw.size > 2 * 1024 * 1024) {
    ElMessage.error('文件不能超过1M')
    return
  }

  const res = await uploadFile(file.raw)
  system[name] = res.fileUrl
  count.value++
}
</script>

<template>
  <el-card>
    <div :key="count">
      <!-- <edit-row v-model="system.title" title="系统标题" width="60%"></edit-row> -->
      <!-- <el-form-item label="版权所有" label-width="100px" class=" [&_.el-form-item\_\_label]:justify-start">
        <el-input v-model="system.copyright" type="textarea" class="w-60%!" :rows="4" placeholder="请输入"></el-input>
      </el-form-item> -->
      <el-form-item label="系统标题" label-width="100px" class="[&_.el-form-item\_\_label]:justify-start">
        <el-input v-model="system.title" class="w-60%!" placeholder="请输入标题"></el-input>
        <!-- <el-input v-model="system.downloadUrl" class="w-19%! ml-1%" placeholder="请输入链接"></el-input> -->
      </el-form-item>

      <div class="flex items-center my-20">
        <div class="w-90">LOGO图</div>
        <div class="mx-10">
          <el-image
            class="w300 h80 mr10 border" :src="system.logo" :hide-on-click-modal="true" :preview-teleported="true"
            :preview-src-list="[system.logo]" fit="contain"
          />
        </div>
        <div>
          <div>大小不能超过1M，支持格式为: gif、Jpg、png等 <br /> (建议图片分辨率为40x40)</div>
          <el-upload
            class="my-4" action="#" :auto-upload="false" :show-file-list="false"
            :on-change="file => fileChange(file, 'logo')"
          >
            <el-button type="primary" size="small"> 上传图片 </el-button>
          </el-upload>
        </div>
      </div>

      <!-- <div class="flex items-center my-20">
        <div class="w-90">顶部背景图</div>
        <div class="mx-10">
          <el-image
            class="w300 h80 mr10 border" :src="system.top" :hide-on-click-modal="true" :preview-teleported="true"
            :preview-src-list="[system.top]" fit="contain"
          />
        </div>
        <div>
          <div>大小不能超过2M，支持格式为: gif、Jpg、png等 <br /> (建议图片分辨率为1920x170)</div>
          <el-upload
            class="my-4" action="#" :auto-upload="false" :show-file-list="false"
            :on-change="file => fileChange(file, 'top')"
          >
            <el-button type="primary" size="small"> 上传图片 </el-button>
          </el-upload>
        </div>
      </div> -->

      <div class="flex items-center my-20">
        <div class="w-90">登录背景图</div>
        <div class="mx-10">
          <el-image
            class="w300 h80 mr10 border" :src="system.login" :hide-on-click-modal="true" :preview-teleported="true"
            :preview-src-list="[system.login]" fit="contain"
          />
        </div>
        <div>
          <div>大小不能超过1M，支持格式为: gif、Jpg、png等 <br /> (建议图片分辨率为1920x1080)</div>
          <el-upload
            class="my-4" action="#" :auto-upload="false" :show-file-list="false"
            :on-change="file => fileChange(file, 'login')"
          >
            <el-button type="primary" size="small"> 上传图片 </el-button>
          </el-upload>
        </div>
      </div>

      <!-- <div class="flex items-center">
        <span class="w-100 mr-10">网站一键变灰</span>
        <el-switch v-model="system.light" @change="save()"></el-switch>
      </div> -->

      <div class="my-30 text-center">
        <el-button type="primary" @click="save()">保存</el-button>
      </div>
    </div>
  </el-card>
</template>

<style lang='scss' scoped></style>
