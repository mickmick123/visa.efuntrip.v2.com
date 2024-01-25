import { defineStore } from 'pinia'

import { fetchWrapper } from '../helpers'
import { APIs } from '../services/apis'
import router from '../router'
import { useToast } from 'vuestic-ui'

const baseUrl = `${import.meta.env.VITE_APP_API_BASE}`
const sto: any = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : ''
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    accessToken: localStorage.getItem('accessToken') ? JSON.parse(sto) : '',
    returnUrl: null,
  }),
  actions: {
    async login(username: any, password: any) {
      const { init, notify, close, closeAll } = useToast()
      const token = await fetchWrapper.post(`${baseUrl}${APIs.LOGIN_USER}`, {
        email: username,
        password: password,
        source: 'web',
      })

      if (token.status === 'Success') {
        this.accessToken = token.data.token
        localStorage.setItem('accessToken', JSON.stringify(this.accessToken))
        router.push(this.returnUrl || '/')
      } else {
        init({ message: token.errors, color: 'danger' })
      }
    },
    logout() {
      this.accessToken = null
      localStorage.removeItem('accessToken')
      router.push('/auth/login')
    },
  },
})
