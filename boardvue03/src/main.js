import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// Pinia 인스턴스 생성
const pinia = createPinia()
const app = createApp(App)

// Pinia를 앱에 등록
app.use(pinia)

// axios 기본 설정
axios.defaults.baseURL = '.'
//axios.defaults.baseURL = 'http://localhost:8080'
// 이제 store를 임포트하고 사용할 수 있습니다
import { useAuthStore } from './stores/auth'

// axios 인터셉터 설정
axios.interceptors.request.use(
  config => {
    const authStore = useAuthStore()
    if (authStore.getAccessToken) {
      config.headers.Authorization = `Bearer ${authStore.getAccessToken}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const authStore = useAuthStore()

      try {
        const refreshed = await authStore.refreshAccessToken()
        if (refreshed) {
          originalRequest.headers.Authorization = `Bearer ${authStore.getAccessToken}`
          return axios(originalRequest)
        }
      } catch (refreshError) {
        authStore.clearAuth()
        router.push('/login')
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

// 라우터 등록
app.use(router)

// 앱 마운트
app.mount('#app')