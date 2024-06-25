import { defineStore } from 'pinia'
import type { IHome } from 'types/home'

export const useGlobalDataStore = defineStore('global', () => {
  const home = reactive({} as IHome)

  const system = reactive({} as Record<string, any>)
  async function getSystem() {
    const res = await Api.getSystem()
    Object.assign(system, res)
  }
  watch(() => system.title, (val) => {
    document.title = val || import.meta.env.VITE_APP_TITLE
  }, { immediate: true })

  const permission = ref([])
  const loadPermission = () => {
    APIPermission.getPermissionListByUser()
      .then((res) => {
        permission.value = res
      })
  }

  return {
    home,
    system,
    getSystem,
    pageData: {
      borrowing_rankings: [],
      reader_ranking: [],
      unit_book_ranking: [],
      newbook_recommand: [],
      num_portal_web: {},
      title: '电子档案查询系统',
    },

    loadPermission,
    permission,
  }
})
