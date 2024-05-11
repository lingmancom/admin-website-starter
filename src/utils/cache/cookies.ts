export function getToken() {
  return localGet('token')
}
export function setToken(token: string) {
  localSet('token', token)
}
export function removeToken() {
  localRemove('token')
}
