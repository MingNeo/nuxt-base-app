# Nuxt Base Template

这是一个基于 Nuxt 3 的基础模板项目,集成了常用的功能和最佳实践。

本脚手架不是一个SSR优先的脚手架，而是客户端优先的脚手架。

## 特性

- 🎨 [UnoCSS](https://github.com/unocss/unocss) - 高性能且灵活的即时原子化 CSS 引擎
- 🍍 [Pinia](https://pinia.vuejs.org/) - 直观的 Vue.js 状态管理库
- 🔥 [VueUse](https://vueuse.org/) - 实用的 Composition API 工具集
- 📲 PWA 支持
- 📱 响应式设计
- 🔐 基础的登录认证
- 🌗 暗黑模式支持

## 用法

```bash
pnpm i

pnpm dev

# 生产环境
pnpm build
# 启动生产服务器
pnpm start
```

## 项目结构

├── app/
│ ├── components/ # 组件
│ ├── composables/ # 组合式函数
│ ├── layouts/ # 布局组件
│ ├── pages/ # 页面
│ ├── stores/ # Pinia 状态管理
│ └── utils/ # 工具函数
├── server/ # 服务端接口
├── public/ # 静态资源
└── uno.config.ts # UnoCSS 配置

## 开发指南

### 布局使用

可以在页面中通过 `definePageMeta` 指定布局:

```vue
<script setup lang="ts">
definePageMeta({
  layout: 'blank',
})
</script>
```

### 请求

纯客户端请求优先使用封装的 `request` 函数发起请求:

```ts
function getUser() {
  // request可以作为$fetch的替代，增加通用拦截器
  return request.get('/api/user')
  // or
  return request({ url: '/api/user', method: 'GET' })
}
```

`useRequest`组合式函数

nuxt自带的useFetch、useAsyncData基于异步组件/异步setup，请求成功后才会加载组件。
useRequest与之不同，仅为简化loading、自动请求等操作，用于常规客户端页面组件。
返回的不是promise，因此无法使用await

```ts
// 默认自动触发，设置immediate为false时，不会自动触发。可随时手动触发execute方法
const { data, error, execute, isLoading } = useRequest(getUser, { immediate: false })
```

使用 `useRequestAsync` 函数发起请求:
如果确实需要useFetch的特性，请优先选择使用useRequestAsync。
useRequestAsync 是基于useFetch的封装，与useFetch的用法完全一致，仅做了通用拦截器处理。

> 最佳实践：仅在开启SSR的页面使用useRequestAsync、useAsyncData/useFetch，其他情况应该优先使用request请求

```ts
const { data, error, execute } = await useRequestAsync('/api/user')
// or useAsyncData。按照官方用法即可，因为getUser中我们已经使用了request。
const { data, error, execute } = await useAsyncData('getUser', getUser)
```

### 静态资源

静态资源放在 `public` 及 `app/assets` 目录下:
按照惯例，`public` 目录下的资源会自动直接复制到产物目录下，`app/assets` 目录下的资源则为vite打包处理后输出到产物目录下。
见：https://nuxt.com/docs/getting-started/assets

```html
<!-- 使用app/assets目录下的资源 -->
<img src="~/assets/images/main.jpg" class="w-50 object-cover" />
<!-- 使用public目录下的资源 -->
<img src="/assets/images/main.jpg" class="w-50 object-cover" />
```

### 登录认证

使用 `useUserStore` 管理用户状态:

```ts
const { userInfo, isLogin } = useUserStore()
```

#### 自动路由登录拦截

路由全局登录验证，如果用户未登录且设置requiresAuth，则自动跳转到登录页

```vue
<script setup lang="ts">
definePageMeta({
  requiresAuth: true,
})
</script>
```

#### 接口拦截

使用 `useRequest` 或 `request` 发起请求时，接口返回401或返回200但code为401，自动跳转到登录页

```ts
const { data } = await useRequest('/api/user')
```

### 状态管理

使用 Pinia 进行状态管理,具体参考 `stores` 目录下的示例。

### 响应式开发

项目内置了常用的断点配置:

- xs: 414px (小屏手机)
- sm: 640px (大屏手机)
- md: 768px (平板)
- lg: 1024px (桌面)
- xl: 1280px (大桌面)
- 2xl: 1536px (超大桌面)

可以使用 `useScreenSize` 在组件中判断屏幕尺寸。

```vue
<script setup lang="ts">
const { screenSize, isMobile } = useScreenSize()
</script>
```

注：css样式中，使用unocss的断点配置即可，如：

```html
<!-- 大于640px -->
<div class="sm:w-[500px]">hello</div>
<!-- 小于640px -->
<div class="max-sm:w-full">hello</div>
```

### 移动端安全区适配

iPhone X 等机型有胶囊、底部指示条等，需要针对这些机型进行安全区适配。

可以开启相关适配

```html
<!-- 在 head 标签中添加 meta 标签，并设置 viewport-fit=cover 值 -->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
/>
```

使用MobileSafeContainer容器包裹内容即可

```vue
<MobileSafeContainer top bottom class="xxx">
  <div>内容</div>
</MobileSafeContainer>
```

或使用本工程提供的的`safe-pt、safe-pb、safe-mt、safe-mb、safe-pt-*、safe-pb-*、safe-mt-*、safe-mb-*`类名

```html
<div class="safe-pt">内容</div>
<div class="safe-pt-2">内容</div>
```

等同于

```css
.safe-pt {
  padding-top: env(safe-area-inset-top);
}
.safe-pt-2 {
  padding-top: calc(env(safe-area-inset-top) + 2rem);
}
```

### 自动路由

在 `app/pages` 目录下创建新的页面文件，文件名即为路由路径，如 `app/pages/index.vue` 对应 `/` 路由。

### 自动导入

在 `app/components` 目录下创建新的组件文件，文件名即为组件名，如 `app/components/Button.vue` 对应 `<Button />` 组件。

在 `app/composables` 目录下创建新的组合式函数文件即可自动导入。

在 `app/stores` 目录下创建新的状态管理文件，即可自动导入。

在 `app/utils` 目录下创建新的工具函数文件，即可自动导入。
