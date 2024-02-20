<script lang="ts" setup>
import { parseTime } from 'lingman'
import { ArticleStatusTypeMeta } from './meta'
import { windowOpen } from '@/utils'

const messageStore = useMessageStore()

const status = keepStatus(ArticleStatusTypeMeta.value[0].value)

const { item, requestPageSettings, dialogVisible, tableData, multipleSelection, loadData, save, generateItem, handleSelectionChange, handleCurrentChange } = useCURDArticle({
  getParams: {
    // kind,
    isCheck: true,
    status,
    enabled: true,
  },
  async preSave(data) {
    if (item.name === '') {
      ElMessage.error('请输入名称')
      return false
    }
    return data
  },
  postGet(data) {
    messageStore.loadTodoCount({ enabled: true, isCheck: true })
    return data
  },

})

watch(status, () => {
  loadData()
}, { immediate: true })

async function updateArticle(checkKind) {
  if (multipleSelection.value.length === 0)
    return ElMessage.warning('请选择要操作的数据')

  if (checkKind === 'reject') {
    await ElMessageBox.prompt('请输入退回原因', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputValue: ' ',
    })
      .then(async ({ value }: any) => {
        const ids = multipleSelection.value.map(item => item.id)
        console.log(ids)
        await Api.updateArticle({ id: ids, checkKind, rejectReason: value })
      })
      .catch(() => { })
  }
  else {
    await ElMessageBox.confirm('审核通过, 是否继续?', '提示', { type: 'warning' }).then(async () => {
      const ids = multipleSelection.value.map(item => item.id)
      await Api.updateArticle({ id: ids, checkKind })
    }).catch(() => { })
  }
  messageStore.loadTodoCount()
  loadData()
  ElMessage.success('操作成功')
}

watch(() => messageStore.todo, (res) => {
  ArticleStatusTypeMeta.value.forEach((e) => {
    // e.num = res[e.value.toLocaleLowerCase()] || 0
    res.forEach((i) => {
      if (i.name === e.label)
        e.num = i.count || 0
    })
  })
})
</script>

<template>
  <el-card class="flex flex-col" body-class="flex flex-col flex-1 h-0">
    <div class="flex justify-between items-center">
      <div class="">
        <el-radio-group v-model="status" size="small">
          <el-radio-button label="publish">
            待审核({{ ArticleStatusTypeMeta[0].num }})
          </el-radio-button>
          <el-radio-button label="pass">
            已通过({{ ArticleStatusTypeMeta[1].num }})
          </el-radio-button>
          <el-radio-button label="reject">
            未通过({{ ArticleStatusTypeMeta[2].num }})
          </el-radio-button>
        </el-radio-group>
      </div>
      <div class="">
        <el-input
          v-model="requestPageSettings.q" placeholder="请输入搜索内容" class="!w-300" clearable
          @clear="(requestPageSettings.pageNumber = 1, loadData())"
          @keyup.enter="(requestPageSettings.pageNumber = 1, loadData())"
        >
          <template #append>
            <el-button @click="(requestPageSettings.pageNumber = 1, loadData())">
              搜索
            </el-button>
          </template>
        </el-input>
      </div>
      <div>
        <template v-if="status === ArticleStatusTypeMeta[0].value">
          <el-button type="primary" size="small" @click="updateArticle('pass')">
            通过
          </el-button>
          <el-button type="danger" size="small" @click="updateArticle('reject')">
            不通过
          </el-button>
        </template>
      </div>
    </div>

    <el-table :data="tableData" border class="flex-1 mt-10" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="文章标题" align="center">
        <template #default="{ row }">
          <div class="cp c-blue underline" @click="windowOpen(row.outLink ? row.link : '/detail', { id: row.id })">
            {{ row.title }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="图片" width="100" align="center">
        <template #default="{ row }">
          <el-image
            v-if="row.cover" class="h-50 w-80" :src="row.cover" :hide-on-click-modal="true"
            :preview-teleported="true" :preview-src-list="[row.cover]"
          />
        </template>
      </el-table-column>
      <el-table-column prop="kindName" label="文章类型" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.kindName">{{ row.kindName }}</el-tag>&nbsp;
          <el-tag v-if="row.agencyKindName">{{ row.agencyKindName }}</el-tag>&nbsp;
          <el-tag v-if="row.specialKindName">{{ row.specialKindName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="supplierUnit" label="供文单位" width="120" align="center"></el-table-column>
      <el-table-column prop="author" label="创建者" width="100" align="center"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间" width="160" align="center">
        <template #default="{ row }">
          {{ parseTime(new Date(row.createdAt)) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.status === 1" type="warning">待审核</el-tag>
          <el-tag v-if="row.status === 2" type="success">已通过</el-tag>
          <el-tag v-if="row.status === 3" type="danger">未通过</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column
            v-if="(status === ArticleStatusTypeMeta[1].value) || status === (ArticleStatusTypeMeta[2].value)"
            prop="approver" label="审核人" width="100" align="center"></el-table-column> -->
      <el-table-column
        v-if="(status === ArticleStatusTypeMeta[1].value) || status === (ArticleStatusTypeMeta[2].value)"
        prop="approvedAt" label="审核时间" width="160" align="center"
      ></el-table-column>
      <el-table-column
        v-if="status === ArticleStatusTypeMeta[2].value" prop="rejectReason" label="驳回原因"
        align="center"
      ></el-table-column>
      <el-table-column prop="operation" label="操作" align="center" width="100">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="windowOpen(row.outLink ? row.link : '/detail', { id: row.id })">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :close-on-click-modal="false" title="新增">
      <edit-row v-model="item.name" required title="名称" width="100%"></edit-row>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="(dialogVisible = false, Object.assign(item, generateItem()))">
            取 消
          </el-button>
          <el-button size="small" type="primary" @click="save()">
            保 存
          </el-button>
        </div>
      </template>
    </el-dialog>
    <div class="fc h-50 mt-10">
      <el-pagination
        v-model:current-page="requestPageSettings.pageNumber" :page-size="requestPageSettings.pageSize"
        layout="total, prev, pager, next, jumper" prev-text="上一页" next-text="下一页" :total="requestPageSettings.totalCount"
        background @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>

<style lang='scss' scope></style>
