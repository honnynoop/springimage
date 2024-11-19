<!-- src/views/Home.vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <!-- 네비게이션 바 -->
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="text-2xl font-bold text-indigo-600">
              Board System
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <template v-if="!authStore.isAuthenticated">
              <router-link
                to="/login"
                class="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                로그인
              </router-link>
              <router-link
                to="/signup"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                회원가입
              </router-link>
            </template>
            <template v-else>
              <router-link
                to="/board"
                class="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                게시판
              </router-link>
              <router-link v-if="authStore.isAdmin"
                to="/admin"
                class="px-4 py-2 text-gray-600 hover:text-gray-900"
              >admin</router-link>
              <button
                @click="handleLogout"
                class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                로그아웃
              </button>
            </template>
          </div>
        </div>
      </div>
    </nav>
    <RouterView />
    <!-- 푸터 -->
    <footer class="bg-gray-800 text-white mt-12">
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p>&copy; 2024 Board System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}
</script>