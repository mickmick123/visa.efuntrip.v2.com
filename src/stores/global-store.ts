import { defineStore } from 'pinia'
import { fetchWrapper } from '../helpers'
import { APIs } from '../services/apis'

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      isSidebarMinimized: false,
    }
  },

  actions: {
    toggleSidebar() {
      this.isSidebarMinimized = !this.isSidebarMinimized
    },
    // changeUserName(userName: string) {
    //   this.userName = userName
    // },
  },
})
