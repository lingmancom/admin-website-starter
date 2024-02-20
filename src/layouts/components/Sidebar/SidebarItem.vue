<script lang="ts" setup>
import { computed } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import path from 'path-browserify'
import SidebarItemLink from './SidebarItemLink.vue'
import { isExternal } from '@/utils/validate'

interface Props {
  item: RouteRecordRaw
  isCollapse?: boolean
  isTop?: boolean
  isFirstLevel?: boolean
  basePath?: string
}

const props = withDefaults(defineProps<Props>(), {
  isCollapse: false,
  isTop: false,
  isFirstLevel: true,
  basePath: '',
})

const messageStore = useMessageStore()

const todoCount = computed(() => messageStore.todo.find(i => i.status === 1)?.count || 0)

/** 是否始终显示根菜单 */
const alwaysShowRootMenu = computed(() => props.item.meta?.alwaysShow)

/** 显示的子菜单 */
const showingChildren = computed(() => {
  return props.item.children?.filter(child => !child.meta?.hidden) ?? []
})

/** 显示的子菜单数量 */
const showingChildNumber = computed(() => {
  return showingChildren.value.length
})

/** 唯一的子菜单项 */
const theOnlyOneChild = computed(() => {
  const number = showingChildNumber.value
  switch (true) {
    case number > 1:
      return null
    case number === 1:
      return showingChildren.value[0]
    default:
      return { ...props.item, path: '' }
  }
})

/** 解析路径 */
function resolvePath(routePath: string) {
  switch (true) {
    case isExternal(routePath):
      return routePath
    case isExternal(props.basePath):
      return props.basePath
    default:
      return path.resolve(props.basePath, routePath)
  }
}
</script>

<template>
  <div
    v-if="!props.item.meta?.hidden"
    :class="{ 'simple-mode': props.isCollapse && !isTop, 'first-level': props.isFirstLevel }"
  >
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <SidebarItemLink v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
        <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
          <SvgIcon v-if="theOnlyOneChild.meta.svgIcon" :name="theOnlyOneChild.meta.svgIcon" />
          <component :is="theOnlyOneChild.meta.elIcon" v-else-if="theOnlyOneChild.meta.elIcon" class="el-icon" />
          <template v-if="theOnlyOneChild.meta.title" #title>
            <el-badge
              :value="todoCount" :max="99" :hidden="!theOnlyOneChild.meta.badge || todoCount === 0"
              class="h-30 leading-30"
            >
              {{ theOnlyOneChild.meta.title }}
            </el-badge>
          </template>
        </el-menu-item>
      </SidebarItemLink>
    </template>
    <el-sub-menu v-else :index="resolvePath(props.item.path)" teleported>
      <template #title>
        <SvgIcon v-if="props.item.meta?.svgIcon" :name="props.item.meta.svgIcon" />
        <component :is="props.item.meta.elIcon" v-else-if="props.item.meta?.elIcon" class="el-icon" />
        <el-badge
          :value="todoCount" :max="99" :hidden="!props.item.meta.badge || todoCount === 0"
          class="h-30 leading-30"
        >
          <span v-if="props.item.meta?.title">{{ props.item.meta.title }}</span>
        </el-badge>
      </template>
      <template v-if="props.item.children">
        <sidebar-item
          v-for="child in props.item.children" :key="child.path" :item="child" :is-collapse="props.isCollapse"
          :is-first-level="false" :base-path="resolvePath(child.path)"
        />
      </template>
    </el-sub-menu>
  </div>
</template>

<style lang="scss" scoped>
.svg-icon {
  min-width: 1em;
  margin-right: 12px;
  font-size: 18px;
}

.el-icon {
  width: 1em;
  margin-right: 12px;
  font-size: 18px;
}

.simple-mode {
  &.first-level {
    :deep(.el-sub-menu) {
      .el-sub-menu__icon-arrow {
        display: none;
      }

      span {
        visibility: hidden;
      }
    }
  }
}
</style>
