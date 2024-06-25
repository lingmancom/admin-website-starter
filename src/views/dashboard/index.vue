<script lang="ts" setup>
</script>

<template>
  <div>
    <el-card class="h-full" body-class="h-full flex flex-col">
      <div>
        <div class="flex items-center">
          <img src="@/assets/images/myAssets.png" class="w-60 mr6">
          <div>
            <div class="text-red text-18 font-bold">
              我的资产
            </div>
            <div>
              <span class="mr20">
                计算机
                <span class="text-25">0</span>
              </span>
              <span class="mr20">
                智能电子设备
                <span class="text-25">0</span>
              </span>
              <span class="mr20">
                图书资料
                <span class="text-25">0</span>
              </span>
              <span class="mr20">
                打印复印
                <span class="text-25">0</span>
              </span>
            </div>
          </div>
        </div>
        <div class="flex items-center mt10">
          <img src="@/assets/images/buy.png" class="w-60 mr6">
          <div>
            <div class="text-red text-18 font-bold">
              采购模块
            </div>
            <div>
              <span class="mr20">
                待审核
                <span class="text-25">0</span>
              </span>
              <span class="mr20">
                待入库
                <span class="text-25">0</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1 grid justify-center items-center">
        <div>
          <span class="mr-70">申请</span>
          <img src="@/assets/images/computer.png" class="w-80 mr-107">
          <img src="@/assets/images/phone.png" class="w-80 mr-107">
          <img src="@/assets/images/book.png" class="w-80 mr-107">
          <img src="@/assets/images/print.png" class="w-80 mr-107">
        </div>
        <div>
          <span class="mr-70">管理</span>
          <img src="@/assets/images/storeIn.png" class="w-80 mr-107">
          <img src="@/assets/images/changeInfo.png" class="w-80 mr-107">
          <img src="@/assets/images/destroy.png" class="w-80 mr-107">
          <img src="@/assets/images/IP.png" class="w-80 mr-107">
        </div>
        <div>
          <span class="mr-70">分类</span>
          <img src="@/assets/images/assetsType.png" class="w-80 mr-107">
          <img src="@/assets/images/assetsList.png" class="w-80 mr-107">
        </div>
        <div>
          <span class="mr-70">设置</span>
          <img src="@/assets/images/setting.png" class="w-80 mr-107">
          <img src="@/assets/images/password.png" class="w-80">
        </div>
      </div>
    </el-card>
  </div>
</template>

<style></style>
