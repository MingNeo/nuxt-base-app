import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

/**
 * 请求封装，使用 $api 插件, 并进行数据格式化。用法同$fetch
 * 仅在客户端使用的情况可直接使用此函数，服务端和客户端共同使用建议使用 useAsyncData 包裹或直接使用useRequest 函数
 * 参见https://nuxt.com/docs/api/utils/dollarfetch
 * @param fetchUrl
 * @param options
 * @returns 返回数据
 */
export async function request<R extends NitroFetchRequest = NitroFetchRequest, O extends NitroFetchOptions<R> = NitroFetchOptions<R>>(fetchUrl: R, options: O = {} as O) {
  try {
    const res = await (useNuxtApp().$api as any)(fetchUrl, options)
    return formatData(res)
  }
  catch (error) {
    console.error('请求失败:', error)
    throw error
  }
}

request.get = <R extends NitroFetchRequest = NitroFetchRequest, O extends NitroFetchOptions<R> = NitroFetchOptions<R>>(fetchUrl: R, options: O = {} as O) =>
  request(fetchUrl, { ...options, method: 'GET' })

request.post = <R extends NitroFetchRequest = NitroFetchRequest, O extends NitroFetchOptions<R> = NitroFetchOptions<R>>(fetchUrl: R, options: O = {} as O) =>
  request(fetchUrl, { ...options, method: 'POST' })

request.put = <R extends NitroFetchRequest = NitroFetchRequest, O extends NitroFetchOptions<R> = NitroFetchOptions<R>>(fetchUrl: R, options: O = {} as O) =>
  request(fetchUrl, { ...options, method: 'PUT' })

request.delete = <R extends NitroFetchRequest = NitroFetchRequest, O extends NitroFetchOptions<R> = NitroFetchOptions<R>>(fetchUrl: R, options: O = {} as O) =>
  request(fetchUrl, { ...options, method: 'DELETE' })

export function formatData(res: any) {
  if (res && Object.prototype.toString.call(res) === '[object Object]') {
    return (res as Record<string, any>).data ?? (res as Record<string, any>).result
  }
  return res
}
