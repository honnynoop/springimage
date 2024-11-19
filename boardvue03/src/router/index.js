import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Home from '../views/MainView.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import BoardList from '../views/BoardView.vue'
import BoardWrite from '../views/BoardWrite.vue'
import AdminPage from '../views/AdminPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/board',
    name: 'BoardList',
    component: BoardList,
    meta: { requiresAuth: true }
  },
  {
    path: '/board/write',
    name: 'BoardWrite',
    component: BoardWrite,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component: AdminPage,
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Pinia store 초기화를 위한 함수
const initializeStore = () => {
  const authStore = useAuthStore()
  return authStore
}

// 네비게이션 가드에서 store 사용
router.beforeEach(async (to, from) => {
  // Pinia store가 준비되었을 때만 실행
  if (typeof window !== 'undefined') {
    const authStore = initializeStore()
    
    // 인증이 필요한 페이지에 접근하려고 할 때
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      // 로그인 페이지로 리다이렉트하고 원래 가려던 페이지 정보를 저장
      return {
        path: '/login',
        query: { redirect: to.fullPath }
      }
    }

    // 관리자 권한이 필요한 페이지에 접근하려고 할 때
    if (to.meta.requiresAdmin && !authStore.isAdmin) {
      return { path: '/' }
    }
  }
})

export default router
