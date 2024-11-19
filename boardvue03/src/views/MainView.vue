<!-- src/views/Home.vue -->
<template>
  <!-- 메인 컨텐츠 -->
  <main class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
 <!-- 환영 섹션 -->
 <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          게시판 시스템에 오신 것을 환영합니다
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          자유롭게 의견을 나누고 소통하세요
        </p>
        
        <!-- 기능 소개 -->
        <div class="grid md:grid-cols-3 gap-8 mt-12">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="text-indigo-600 text-4xl mb-4">
              <i class="fas fa-users"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2">회원 시스템</h3>
            <p class="text-gray-600">
              간편한 회원가입과 로그인으로 시작하세요
            </p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="text-indigo-600 text-4xl mb-4">
              <i class="fas fa-clipboard"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2">게시판</h3>
            <p class="text-gray-600">
              자유롭게 글을 작성하고 다른 사용자와 소통하세요
            </p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="text-indigo-600 text-4xl mb-4">
              <i class="fas fa-search"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2">검색 기능</h3>
            <p class="text-gray-600">
              원하는 내용을 쉽게 찾을 수 있습니다
            </p>
          </div>
        </div>

        <!-- 시작하기 버튼 -->
        <div class="mt-12" v-if="!authStore.isAuthenticated">
          <router-link
            to="/signup"
            class="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-lg font-semibold"
          >
            지금 시작하기
          </router-link>
        </div>
      </div>
</main>
     
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
//import { useRouter } from 'vue-router'

const authStore = useAuthStore()

/*
const router = useRouter()
const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}
*/
</script>