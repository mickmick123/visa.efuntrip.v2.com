import { useAuthStore } from '../stores/authStore'

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE'),
}

function request(method: any) {
  return (url: any, body: any) => {
    const requestOptions: any = {
      method,
      headers: authHeader(url),
    }
    if (body) {
      requestOptions.headers['Content-Type'] = 'application/json'
      requestOptions.body = JSON.stringify(body)
    }
    return fetch(url, requestOptions).then(handleResponse)
  }
}

// helper functions

function authHeader(url: any) {
  // return auth header with jwt if user is logged in and request is to the api url
  const { accessToken } = useAuthStore()
  const isLoggedIn = !!accessToken
  const isApiUrl = url.startsWith(import.meta.env.VITE_APP_API_BASE)
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${accessToken}` }
  } else {
    return {}
  }
}

function handleResponse(response: any) {
  return response.text().then((text: any) => {
    const data = text && JSON.parse(text)

    if (!response.ok) {
      const { accessToken, logout } = useAuthStore()
      if ([401, 403].includes(response.status) && accessToken) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        logout()
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}
