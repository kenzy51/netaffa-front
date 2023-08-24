import axios from 'axios'
import env from '../env'

export const $api: any = axios.create({
  baseURL: env.API_URL || process.env.NEXT_PUBLIC_API_URL,
})

// $api.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     
//     config.headers['Accept-Language'] = Cookies.get('lang')
//     return config
//   },
//   (error: AxiosError) => {
//     Promise.reject(error)
//   }
// )
// $api.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response
//   },
//   async (error: AxiosError) => {
//     return Promise.reject(error)
//   }
// )

// $api.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = Cookies.get('accessToken')
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`
//     }
//     return config
//   },
//   (error: AxiosError) => {
//     Promise.reject(error)
//   }
// )
//
// $api.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response
//   },
//   async (error: AxiosError<any>) => {
//     const originalRequest = error.config as InternalAxiosRequestConfig<any> & { _retry: boolean }
//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       find(error.response.data.messages, (v) => v.token_type === 'access')
//     ) {
//       originalRequest._retry = true
//       try {
//         const { data } = await axios.post(`${API_URL}/accounts/auth/jwt/refresh/`, {
//           refresh: `${Cookies.get('refreshToken')}`,
//         })
//         Cookies.set('accessToken', data.access)
//       } catch (error) {
//         useUser.getState().toggleAuth(false)
//         window.location.href = '/user/login'
//       }
//       return $api(originalRequest)
//     }
//     return Promise.reject(error)
//   }
// )
