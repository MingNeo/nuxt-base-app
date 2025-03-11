<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const online = useOnline()
</script>

<template>
  <div>
    <ClientOnly>
      <Suspense>
        <div v-if="online" class="flex flex-col items-center justify-center gap-8 p-10 md:p-40">
          <img src="~/assets/images/main.jpg" class="h-20 w-20 object-cover">
          <div class="text-2xl font-bold">
            Nuxt Base Template
          </div>
          <div i-carbon-close class="h-5 w-5" />
          <p>
            这是一个基于 Nuxt 3 的基础模板项目,集成了常用的最基础功能和最佳实践。
          </p>
          <p class="text-left">
            💚 基于 Nuxt 3 的基础模板项目, SSR/SSG<br>
            🎨 内置 UnoCSS - 高性能且灵活的即时原子化 CSS 引擎<br>
            😊 内置图标管理，支持 iconify 和 assets/icons目录下svg直接使用<br>
            🍍 内置 Pinia - 直观的 Vue.js 状态管理库<br>
            🔥 内置 VueUse - 实用的 Composition API 工具集<br>
            📲 内置 PWA 支持<br>
            📱 内置响应式设计<br>
            🔐 基础的登录认证、权限管理<br>
            😊 请求封装，通用拦截<br>
            🌗 暗黑模式支持
          </p>
        </div>
        <div v-else class="h-full w-full flex items-center justify-center p-40 text-gray-800">
          You're offline
        </div>
        <template #fallback>
          <div class="italic opacity-50">
            <span class="animate-pulse">Loading...</span>
          </div>
        </template>
      </Suspense>
      <template #fallback>
        <div class="opacity-50">
          <span class="animate-pulse">...</span>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
