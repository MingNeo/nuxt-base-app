import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = useCookie('token') // 使用 cookie 存储 token（支持 SSR）
  // const router = useRouter()
  // const config = useRuntimeConfig()
  const loginLoading = ref(false)
  const isLogin = ref(false)
  const userInfo = ref<any>(null)
  // 登录方法
  const login = async (credentials: { username: string, password: string }) => {
    try {
      const { data, error, status } = await useRequestAsync('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: credentials,
      })

      loginLoading.value = status.value === 'pending'

      if (error.value)
        throw error.value

      // 假设后端返回 { token: 'xxx', expires: 3600 }
      const tokenData = (data.value as Record<string, any>)?.token

      if (tokenData) {
        token.value = tokenData
        isLogin.value = true
      }
      return data.value
    }
    catch (err) {
      console.error('登录失败:', err)
      throw err
    }
  }

  const quickLogin = async (credentials: { phone: string, code: string }) => {
    try {
      const { data, error, status } = await useRequestAsync('/api/auth/quickLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: credentials,
      })

      loginLoading.value = status.value === 'pending'

      if (error.value)
        throw error.value

      const tokenData = (data.value as Record<string, any>)?.token

      if (tokenData) {
        token.value = tokenData
        isLogin.value = true
      }
      return data.value
    }
    catch (err) {
      console.error('登录失败:', err)
      throw err
    }
  }

  // 登出方法
  const logout = () => {
    token.value = null
    isLogin.value = false
    // router.push('/login')
  }

  const getCaptcha = async (phone: string) => {
    const { data, error } = await useRequestAsync('/api/user/captcha', {
      method: 'POST',
      body: { phone },
    })

    if (error.value)
      throw error.value

    return data.value
  }

  // 获取当前用户
  const getUserInfo = async () => {
    // if (!token.value)
    //   return null

    const { data, error } = await useRequestAsync('/api/user/current')
    if (error.value)
      throw error.value

    userInfo.value = data.value
    return data.value
  }

  return { token, userInfo, isLogin, loginLoading, login, quickLogin, logout, getUserInfo, getCaptcha }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
