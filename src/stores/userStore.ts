import { defineStore } from 'pinia'

import { fetchWrapper } from '../helpers'
import { APIs } from '../services/apis'
import router from '../router'

const baseUrl = `${import.meta.env.VITE_APP_API_BASE}`

export const useUsersStore = defineStore({
  id: 'user',
  state: () => ({
    user: {},
  }),
  actions: {
    async getCurrentUser() {
      this.user = { loading: true }
      fetchWrapper
        .get(`${baseUrl}${APIs.GET_CURRENT_USER}`, null)
        .then((user) => {
          this.user = user.data.information
        })
        .catch((error: any) => {
          router.push('/auth/login')
        })
    },
  },
})
