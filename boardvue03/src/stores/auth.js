// src/stores/auth.js
import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

  export const useAuthStore = defineStore('auth', () => {
    // state
    const accessToken = ref(localStorage.getItem('accessToken') || null)
    const refreshToken = ref(localStorage.getItem('refreshToken') || null)
    const user = ref(JSON.parse(localStorage.getItem('userInfo')) || null)
    const role = ref(localStorage.getItem('userRole') || null)

    // getters
    const isAuthenticated = computed(() => !!accessToken.value)
    const isAdmin = computed(() => role.value === 'ADMIN')
    const getAccessToken = computed(() => accessToken.value)
    const getRefreshToken = computed(() => refreshToken.value)
      // computed property로 memberId 가져오기
    const getMemberId = computed(() => user.value?.memberId || null)
  
    // actions
    const setTokens = (newAccessToken, newRefreshToken) => {
      accessToken.value = newAccessToken
      refreshToken.value = newRefreshToken
      localStorage.setItem('accessToken', newAccessToken)
      localStorage.setItem('refreshToken', newRefreshToken)
    }
  
    const setUser = (userData) => {
      console.log("setUser==============================================>"+userData.id);
      // 전체 사용자 객체 저장
      user.value = {
        memberId: userData.id,
        username: userData.username,
        role: userData.role || 'USER',
        // 필요한 다른 사용자 정보도 여기에 추가
      }
      role.value = userData.role || 'USER'
      
      // localStorage에 사용자 정보 저장
      localStorage.setItem('userInfo', JSON.stringify(user.value))
      localStorage.setItem('userRole', role.value)
    }
  
    const clearAuth = () => {
      accessToken.value = null
      refreshToken.value = null
      user.value = null
      role.value = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('userRole')
      localStorage.removeItem('userInfo')
    }
  
    const login = async (username, password) => {
      try {
        const response = await axios.post('/api/auth/login', {
          username,
          password
        })
        
        setTokens(
          response.data.access_token,
          response.data.refresh_token
        )
        console.log("login==============================================>"+response.data.user.id);
        // 사용자 정보 설정
        setUser({
          id: response.data.user.id, // 또는 response.data.user.memberId
          username: response.data.user.username,
          role: response.data.user.role || 'USER'
        })
        
        return true
      } catch (error) {
        console.error('Login failed:', error)
        return false
      }
    }
  
  const signup = async (userData) => {
    try {
      const response = await axios.post('/api/auth/signup', userData)
      return response.data
    } catch (error) {
      console.error('Signup failed:', error)
      throw error
    }
  }

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post('/api/auth/refresh', {}, {
        headers: {
          Authorization: `Bearer ${refreshToken.value}`
        }
      })
      
      if (response.data.access_token) {
        setTokens(response.data.access_token, refreshToken.value)
        return true
      }
      return false
    } catch (error) {
      clearAuth()
      return false
    }
  }

  const logout = async () => {
    alert(accessToken.value);
    try {
      if (accessToken.value) {
        await axios.post('/api/logout', {}, {
          headers: {
            Authorization: `Bearer ${accessToken.value}`
          }
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      clearAuth()
    }
  }

  // 초기 사용자 상태 설정
  const initializeAuth = () => {
    const savedToken = localStorage.getItem('accessToken')
    const savedRole = localStorage.getItem('userRole')
    
    if (savedToken) {
      accessToken.value = savedToken
      role.value = savedRole
    }
  }

  // API 요청 헤더 생성 헬퍼
  const getAuthHeader = computed(() => {
    return accessToken.value ? {
      Authorization: `Bearer ${accessToken.value}`
    } : {}
  })

  return {
    // state
    accessToken,
    refreshToken,
    user,
    role,

    getMemberId,

    // getters
    isAuthenticated,
    isAdmin,
    getAccessToken,
    getRefreshToken,
    getAuthHeader,

    // actions
    setTokens,
    setUser,
    clearAuth,
    login,
    signup,
    refreshAccessToken,
    logout,
    initializeAuth
  }
})

// axios interceptor setup (선택적으로 별도 파일로 분리 가능)
export const setupAxiosInterceptors = (store) => {
  axios.interceptors.request.use(
    config => {
      const token = store.getAccessToken
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
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

        try {
          const refreshed = await store.refreshAccessToken()
          if (refreshed) {
            originalRequest.headers.Authorization = `Bearer ${store.getAccessToken}`
            return axios(originalRequest)
          }
        } catch (refreshError) {
          store.clearAuth()
          if (router) {
            router.push('/login')
          }
          return Promise.reject(refreshError)
        }
      }
      
      return Promise.reject(error)
    }
  )
}