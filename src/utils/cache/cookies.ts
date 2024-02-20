/** 统一处理 Cookie */

import Cookies from 'js-cookie'
import CacheKey from '@/constants/cache-key'

export function getToken() {
  return Cookies.get(CacheKey.TOKEN)
}
export function setToken(token: string) {
  Cookies.set(CacheKey.TOKEN, token)
}
export function removeToken() {
  Cookies.remove(CacheKey.TOKEN)
}
