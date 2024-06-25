<script setup lang="ts">
import { useTime } from '@/hooks/useTime'
import { historyList } from '@/composables/history'

defineProps<{ title: string }>()

const dataScreenRef = ref<HTMLElement | null>(null)

// 根据浏览器大小推断缩放比例
function getScale(width = 1920, height = 1080) {
  const ww = window.innerWidth / width
  const wh = window.innerHeight / height
  return ww < wh ? ww : wh
}

// 监听浏览器 resize 事件
function resize() {
  if (dataScreenRef.value)
    dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
}

onMounted(() => {
  // 初始化时为外层盒子加上缩放属性，防止刷新界面时就已经缩放
  if (dataScreenRef.value) {
    dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
    dataScreenRef.value.style.width = '1920px'
    dataScreenRef.value.style.height = '1080px'
  }

  // 为浏览器绑定事件
  window.addEventListener('resize', resize)
})

// 获取当前时间
const { nowTime } = useTime()
let timer: any = null
const time = ref(nowTime.value)
timer = setInterval(() => {
  time.value = useTime().nowTime.value
}, 1000)

// 销毁时触发
onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  clearInterval(timer!)
})

// const AsyncEarth = defineAsyncComponent(() => import('@/components/Earth.vue'))

const router = useRouter()
const route = useRoute()
const type = route.query.type as string
console.log('type', type)

async function jump() {
  const name = historyList.value.pop()
  console.log('name', name)

  router.replace({ name: name as string })
}
</script>

<template>
  <div class="dataScreen-container text-white select-none">
    <div ref="dataScreenRef" class="dataScreen">
      <div class="dataScreen-header h-83px c-#00c6ff">
        <div class="header-rg">
          <span class="header-time pr-8 leading-66">{{ time }}</span>
        </div>

        <div class="header-ct">
          <div class="header-ct-title cp">
            <!-- <span>{{ title }}</span> -->
            <slot name="title"></slot>
          </div>
        </div>
        <div class="header-lf pr-40">
          <div class="ml-auto text-38px fwbold leading-66 cp i-ion-arrow-undo-outline mt-9" @click="jump()">
          </div>
        </div>
      </div>
      <div class="px-30px flex-1 h-0 flex flex-col py-20px gap-20">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.t8 {
  // 上下运动的动画
  animation: animate 8s ease-in-out infinite;
}

.t7 {
  // 上下运动的动画
  animation: animate 7s ease-in-out infinite;
}

.t5 {
  // 上下运动的动画
  animation: animate 5s ease-in-out infinite;
}

.t6 {
  // 上下运动的动画
  animation: animate 6s ease-in-out infinite;
}

// 动画
@keyframes animate {

  0%,
  100% {
    transform: translateY(-18px);
  }

  50% {
    transform: translateY(18px);
  }
}

// @import "./index.scss";
.dataScreen-container {
  width: 100%;
  height: 100%;
  background: url("@/assets/images/screen1_bg.png") no-repeat;
  // background-color: #11144E;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: 100% 100%;
  background-size: cover;

  .dataScreen {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 999;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.3s;
    transform-origin: left top;

    .dataScreen-header {
      display: flex;
      width: 100%;
      height: 120px;
      background-image: url('@/assets/images/s_header_bg.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;

      .header-lf,
      .header-rg {
        position: relative;
        width: 567px;
        height: 100%;
        // background: url("./images/dataScreen-header-left-bg.png") no-repeat;
        // background-size: 100% 100%;
      }

      .header-ct {
        position: relative;
        flex: 1;
        height: 100%;

        .header-ct-title {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 83px;
          font-family: YouSheBiaoTiHei;
          font-size: 42px;
          font-weight: bold;
          line-height: 80px;
          text-align: center;
          letter-spacing: 4px;
          // background: url("./images/dataScreen-header-center-bg.png") no-repeat;
          // background-size: 100% 100%;
        }
      }

      .header-time {
        position: absolute;
        top: 0;
        left: 20px;
        font-family: YouSheBiaoTiHei;
        font-size: 28px;
        font-weight: 600;
        white-space: nowrap;
      }
    }

  }
}
</style>
