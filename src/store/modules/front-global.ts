import { defineStore } from 'pinia'
import type { IHome } from 'types/home'

export const useGlobalStore = defineStore('global', () => {
  const homeData = reactive({} as IHome)

  function loadHomeData() {
    Api.home()
      // .then(res => {console.log('res', res); return res})
      .then(res => Object.assign(homeData, res))
      // .then(res => console.log('home data', res))
  }

  return {
    homeData,
    loadHomeData,
  }
})
