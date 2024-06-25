export const PreviewStore = defineStore({
  id: 'PreviewStore',
  state: () => {
    return {
      // 记录图片预览数据
		   imageViewer: {
			    show: false, // 控制图片的显现
			    url: '', // 预览的图片路径
			    close: () => {}, // 关闭的回调方法
		    },
    }
  },
  actions: {
    // 打开图片预览的弹窗
    openImageViewer({ url, close }: { url: string, close?: Function }) {
      this.imageViewer = {
        show: true,
        url,
        close: async () => {
          close && (await close())
          this.imageViewer.show = false
        },
      }
    },
  },
})
