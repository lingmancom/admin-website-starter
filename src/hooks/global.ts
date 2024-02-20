import type { IHome } from 'types/home'

export const useGlobalDataStore = defineStore('globalData', () => {
  const home = reactive({} as IHome)

  const system = reactive({} as Record<string, any>)
  function getSystem() {}

  return {
    home,
    system,
    getSystem,
  }
})
