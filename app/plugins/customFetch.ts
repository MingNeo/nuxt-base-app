import { apiWhitelist } from '~/config/whitelist'

export default defineNuxtPlugin((nuxtApp) => {
  const token = useCookie('token')
  const config = useRuntimeConfig()

  const unLoginHandler = (url: string) => {
    if (apiWhitelist.includes(url))
      return

    token.value = null
    message.error('未登录')
    nuxtApp.runWithContext(() => navigateTo('/login'))
  }

  const $customFetch = $fetch.create({
    baseURL: config.public.apiBaseUrl ?? '',
    timeout: 180000, // 请求超时时间
    headers: {
      'source': 'ZHIDEMAI',
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
    },
    onRequest({ options }) {
      if (token.value) {
        options.headers.set('Authorization', `Bearer ${token.value}`)
      }
    },
    onRequestError({ error }) {
      if (error) {
        // 取消请求不进行报错处理
        if (error?.message === 'canceled') {
          return Promise.reject(error)
        }

        if (error?.message === 'Network Error') {
          error.message = '网络异常'
        }

        if (error?.message.includes('timeout')) {
          error.message = '数据处理中，请稍后重试'
        }

        message.error(error.message || '接口异常')
      }
    },
    onResponse({ response: res }) {
      console.log('🚀 klose ~ onResponse klose ~ res:', res)
      const status = Number(res.status) || 200

      if (status !== 200)
        return Promise.reject(res)

      // 增加请求返回200，但是内部报错处理
      if (res._data.code && res._data.code !== 200) {
        if (res._data.code === 401) {
          unLoginHandler(res.url?.replace(config.public.apiBaseUrl, ''))
          return Promise.reject(new Error(res._data.error))
        }

        res._data.error && message.error(res._data.error)
        return Promise.reject(new Error(res._data.error))
      }
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        unLoginHandler(response.url?.replace(config.public.apiBaseUrl, ''))
      }

      if ([504, 499, 'ECONNABORTED'].includes(response.status)) {
        message.error('数据处理中，请稍后重试')
      }
    },
  })

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api: $customFetch,
    },
  }
})
