import axios from 'axios'
import { useAuthStore } from '../stores/authStore'

export const postHelper = (url: any, options: any) => {
  const config: any = {
    method: 'post',
    responseType: 'blob',
    data: options,
    // responseType: 'application/vnd.ms-excel',
    headers: authHeader(url),
    url: url,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
  }

  return axios(config)
}

function authHeader(url: any) {
  // return auth header with jwt if user is logged in and request is to the api url
  const { accessToken } = useAuthStore()
  const isLoggedIn = !!accessToken
  const isApiUrl = url.startsWith(import.meta.env.VITE_APP_API_BASE)
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json;charset=UTF-8' }
  } else {
    return { 'Content-Type': 'application/json;charset=UTF-8' }
  }
}
