/**
 * 路由全局登录验证
 * 1. 如果用户未登录且设置requiresAuth，则跳转到登录页
 * 2. 如果用户已登录，则跳转到首页
 */
export default defineNuxtRouteMiddleware((to) => {
  const { isLogin } = storeToRefs(useUserStore())
  const token = useCookie('token')

  if (token.value) {
    isLogin.value = true
  }

  // 需要登录的页面
  if (to.path !== '/login' && to.meta.requiresAuth && !token.value) {
    abortNavigation()
    return navigateTo('/login')
  }

  // 已登录用户访问登录页
  if (to.path === '/login' && token.value) {
    return navigateTo('/')
  }
})
