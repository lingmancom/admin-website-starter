/// <reference types="vitest" />

import path, { resolve } from 'node:path'
import process from 'node:process'
import { type ConfigEnv, type UserConfigExport, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgLoader from 'vite-svg-loader'
import UnoCSS from 'unocss/vite'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Inspect from 'vite-plugin-inspect'
import Inspector from '@djie/vite-plugin-vue-inspector'
import legacy from '@vitejs/plugin-legacy'
import { LingManVueAutoImport } from 'lingman/vue'
import LingMan from 'lingman/vite'

import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import VueDevTools from 'vite-plugin-vue-devtools'

/** 配置项文档：https://cn.vitejs.dev/config */
export default (configEnv: ConfigEnv): UserConfigExport => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv
  const { VITE_PUBLIC_PATH } = viteEnv
  return {
    /** Vite 插件 */
    plugins: [
      vue(),
      vueJsx(),
      VueSetupExtend(),

      AutoImport({
        imports: ['vue', '@vueuse/core', 'pinia', { 'element-plus': ['ElMessageBox', 'ElMessage'] }, 'vue-router', LingManVueAutoImport()],
        resolvers: [
          ElementPlusResolver(),
        ],
        dts: true,
        dirs: [
          'src/api',
          'src/store/modules',
          'src/composables',
          'src/hooks',
        ],
      }),
      Components({
        extensions: ['vue', 'tsx'],
        resolvers: [
          ElementPlusResolver(),
          // (componentName) => { console.log(componentName) },
        ],
        dts: true,
      }),

      /** 将 SVG 静态图转化为 Vue 组件 */
      svgLoader({ defaultImport: 'url' }),
      /** SVG */
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        symbolId: 'icon-[dir]-[name]',
      }),
      /** UnoCSS */
      UnoCSS(),
      Inspect(),
      Inspector(),
      VueDevTools(),
      legacy({
        targets: ['defaults', 'ie >= 11', 'chrome 52'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        renderLegacyChunks: true,
        polyfills: [
          'es.symbol',
          'es.promise',
          'es.promise.finally',
          'es/map',
          'es/set',
          'es.array.filter',
          'es.array.for-each',
          'es.array.flat-map',
          'es.object.define-properties',
          'es.object.define-property',
          'es.object.get-own-property-descriptor',
          'es.object.get-own-property-descriptors',
          'es.object.keys',
          'es.object.to-string',
          'web.dom-collections.for-each',
          'esnext.global-this',
          'esnext.string.match-all',
        ],
      }),
      LingMan(),
    ],
    /** 打包时根据实际情况修改 base */
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      host: true, // host: "0.0.0.0"
      port: 2333,
    },
    build: {
      /** 单个 chunk 文件的大小超过 2048KB 时发出警告 */
      chunkSizeWarningLimit: 2048,
      /** 禁用 gzip 压缩大小报告 */
      reportCompressedSize: false,
      /** 打包后静态资源目录 */
      assetsDir: 'static',
      rollupOptions: {
        output: {
          /**
           * 分块策略
           * 1. 注意这些包名必须存在，否则打包会报错
           * 2. 如果你不想自定义 chunk 分割策略，可以直接移除这段配置
           */
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            element: ['element-plus', '@element-plus/icons-vue'],
          },
        },
      },
    },
    /** 混淆器 */
    esbuild: {
      /** 打包时移除 console.log */
      pure: ['console.log'],
      /** 打包时移除 debugger */
      drop: ['debugger'],
      /** 打包时移除所有注释 */
      legalComments: 'none',
    },
    /** Vitest 单元测试配置：https://cn.vitest.dev/config */
    test: {
      include: ['tests/**/*.test.ts'],
      environment: 'jsdom',
    },
    optimizeDeps: {
      include: [
        'lingman/vue',
        'vue',
        'sass',
        'mitt',
        'axios',
        'pinia',
        'dayjs',
        'unocss',
        'vue-router',
        'lodash-es',
        'nprogress',
        '@vueuse/core',
        'echarts/core',
        'echarts/charts',
        'echarts/components',
        'echarts/renderers',
        '@wangeditor/editor',
        '@wangeditor/editor-for-vue',
        'element-plus',
        'element-plus/es',
        'element-plus/es/locale/lang/zh-cn',
        'element-plus/es/locale/lang/en',
        'element-plus/es/components/scrollbar/style/css',
        'element-plus/es/components/icon/style/css',
        'element-plus/es/components/avatar/style/css',
        'element-plus/es/components/space/style/css',
        'element-plus/es/components/backtop/style/css',
        'element-plus/es/components/form/style/css',
        'element-plus/es/components/radio-group/style/css',
        'element-plus/es/components/radio/style/css',
        'element-plus/es/components/checkbox/style/css',
        'element-plus/es/components/checkbox-group/style/css',
        'element-plus/es/components/switch/style/css',
        'element-plus/es/components/time-picker/style/css',
        'element-plus/es/components/date-picker/style/css',
        'element-plus/es/components/descriptions/style/css',
        'element-plus/es/components/descriptions-item/style/css',
        'element-plus/es/components/link/style/css',
        'element-plus/es/components/tooltip/style/css',
        'element-plus/es/components/drawer/style/css',
        'element-plus/es/components/dialog/style/css',
        'element-plus/es/components/checkbox-button/style/css',
        'element-plus/es/components/option-group/style/css',
        'element-plus/es/components/radio-button/style/css',
        'element-plus/es/components/cascader/style/css',
        'element-plus/es/components/color-picker/style/css',
        'element-plus/es/components/input-number/style/css',
        'element-plus/es/components/rate/style/css',
        'element-plus/es/components/select-v2/style/css',
        'element-plus/es/components/tree-select/style/css',
        'element-plus/es/components/slider/style/css',
        'element-plus/es/components/time-select/style/css',
        'element-plus/es/components/autocomplete/style/css',
        'element-plus/es/components/image-viewer/style/css',
        'element-plus/es/components/upload/style/css',
        'element-plus/es/components/col/style/css',
        'element-plus/es/components/form-item/style/css',
        'element-plus/es/components/alert/style/css',
        'element-plus/es/components/breadcrumb/style/css',
        'element-plus/es/components/select/style/css',
        'element-plus/es/components/input/style/css',
        'element-plus/es/components/breadcrumb-item/style/css',
        'element-plus/es/components/tag/style/css',
        'element-plus/es/components/pagination/style/css',
        'element-plus/es/components/table/style/css',
        'element-plus/es/components/table-v2/style/css',
        'element-plus/es/components/table-column/style/css',
        'element-plus/es/components/card/style/css',
        'element-plus/es/components/row/style/css',
        'element-plus/es/components/button/style/css',
        'element-plus/es/components/menu/style/css',
        'element-plus/es/components/sub-menu/style/css',
        'element-plus/es/components/menu-item/style/css',
        'element-plus/es/components/option/style/css',
        'element-plus/es/components/dropdown/style/css',
        'element-plus/es/components/dropdown-menu/style/css',
        'element-plus/es/components/dropdown-item/style/css',
        'element-plus/es/components/skeleton/style/css',
        'element-plus/es/components/skeleton/style/css',
        'element-plus/es/components/backtop/style/css',
        'element-plus/es/components/menu/style/css',
        'element-plus/es/components/sub-menu/style/css',
        'element-plus/es/components/menu-item/style/css',
        'element-plus/es/components/dropdown/style/css',
        'element-plus/es/components/tree/style/css',
        'element-plus/es/components/dropdown-menu/style/css',
        'element-plus/es/components/dropdown-item/style/css',
        'element-plus/es/components/badge/style/css',
        'element-plus/es/components/breadcrumb/style/css',
        'element-plus/es/components/breadcrumb-item/style/css',
        'element-plus/es/components/image/style/css',
        'element-plus/es/components/collapse-transition/style/css',
        'element-plus/es/components/timeline/style/css',
        'element-plus/es/components/timeline-item/style/css',
        'element-plus/es/components/collapse/style/css',
        'element-plus/es/components/collapse-item/style/css',
        'element-plus/es/components/button-group/style/css',
        'element-plus/es/components/text/style/css',
        'element-plus/es/components/divider/style/css',
        'element-plus/es/components/empty/style/css',
        'element-plus/es/components/aside/style/css',
        'element-plus/es/components/container/style/css',
        'element-plus/es/components/main/style/css',
        'element-plus/es/components/header/style/css',
        'element-plus/es/components/popover/style/css',
        'element-plus/es/components/tabs/style/css',
        'element-plus/es/components/tab-pane/style/css',
        'element-plus/es/components/loading/style/css',
        'element-plus/es/components/base/style/css',
        'element-plus/es/components/config-provider/style/css',
      ],
    },
  }
}
