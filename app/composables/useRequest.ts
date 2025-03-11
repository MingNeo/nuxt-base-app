import type { UseFetchOptions } from 'nuxt/app'
import { useFetch } from 'nuxt/app'

export interface UseRequestOptions<T> extends UseFetchOptions<T> {
  // 这里可以添加额外的选项
  showError?: boolean
  loading?: boolean
}

/**
 * 请求封装，非异步使用，用于纯客户端请求
 * @param url
 * @param opts
 * @returns 返回数据
 */
export default function useRequest<T>(
  fetchFn: ((...args: any[]) => Promise<T>),
  opts: {
    immediate?: boolean
    onSuccess?: (data: T, response: any) => void
    onError?: (error: unknown) => void
    default?: T
    transform?: (data: T) => T
  } = {},
) {
  const { immediate = true, onSuccess, onError, default: defaultData, transform } = opts || {}

  const data = ref<T>(defaultData as any)
  const isLoading = ref(false)
  const error = shallowRef<unknown>()

  const execute = async (...args: any[]) => {
    error.value = undefined
    isLoading.value = true

    return new Promise((resolve, reject) => fetchFn(...args)
      .then((r: any) => {
        data.value = transform ? transform(r) : r
        onSuccess?.(data.value, r)
        resolve(data.value)
      })
      .catch((e: any) => {
        error.value = e
        onError?.(e)
        reject(e)
      })
      .finally(() => isLoading.value = false))
  }

  if (immediate) {
    execute().then(undefined, console.error)
  }

  return {
    data: data as Ref<T>,
    error,
    isLoading,
    execute,
  }
}

/**
 * 请求封装，异步使用，用于服务端请求。是增加了通用拦截的useFetch
 * @param url
 * @param opts
 * @returns 返回数据
 */
export function useRequestAsync<T>(url: string | Request | Ref<string | Request> | (() => string | Request), opts: UseRequestOptions<T> = {}) {
  return useFetch<T>(url, {
    // server: false,
    transform: res => formatData(res),
    ...(opts as any),
    $fetch: useNuxtApp().$api,
  })
}
