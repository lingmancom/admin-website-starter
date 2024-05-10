import { defineStore } from 'pinia'

export const useGLobalStore = defineStore('global', () => {
  const permission = ref([])
  const loadPermission = () => {
    Api.getPermissionList()
      .then((res) => {
        permission.value = res
      })
  }

  return {
    loadPermission,
    permission,
  }
})
