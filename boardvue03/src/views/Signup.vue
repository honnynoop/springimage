<!-- src/views/Signup.vue -->
<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900">회원가입</h2>
          <p class="mt-2 text-gray-600">계정을 생성하여 시작하세요</p>
        </div>
  
        <form class="space-y-6" @submit.prevent="handleSignup">
          <!-- 이메일(username) 입력 -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="formData.username"
                type="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="example@email.com"
                :class="{ 'border-red-500': errors.username }"
              />
              <p v-if="errors.username" class="mt-1 text-sm text-red-600">
                {{ errors.username }}
              </p>
            </div>
          </div>
  
          <!-- 이름(firstName) 입력 -->
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700">
              이름
            </label>
            <div class="mt-1">
              <input
                id="firstName"
                v-model="formData.firstName"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                :class="{ 'border-red-500': errors.firstName }"
              />
              <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">
                {{ errors.firstName }}
              </p>
            </div>
          </div>
  
          <!-- 성(lastName) 입력 -->
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700">
              성
            </label>
            <div class="mt-1">
              <input
                id="lastName"
                v-model="formData.lastName"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                :class="{ 'border-red-500': errors.lastName }"
              />
              <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">
                {{ errors.lastName }}
              </p>
            </div>
          </div>
  
          <!-- 비밀번호 입력 -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="formData.password"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                :class="{ 'border-red-500': errors.password }"
              />
              <p v-if="errors.password" class="mt-1 text-sm text-red-600">
                {{ errors.password }}
              </p>
            </div>
          </div>
  
          <!-- 비밀번호 확인 입력 -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              비밀번호 확인
            </label>
            <div class="mt-1">
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                :class="{ 'border-red-500': errors.confirmPassword }"
              />
              <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">
                {{ errors.confirmPassword }}
              </p>
            </div>
          </div>
  
          <!-- 제출 버튼 -->
          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <template v-if="isLoading">
                <span class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  처리중...
                </span>
              </template>
              <template v-else>
                회원가입
              </template>
            </button>
          </div>
  
          <!-- 로그인 링크 -->
          <div class="text-center mt-4">
            <p class="text-sm text-gray-600">
              이미 계정이 있으신가요?
              <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
                로그인
              </router-link>
            </p>
          </div>
        </form>
  
        <!-- 알림 메시지 -->
        <div
          v-if="showAlert"
          class="mt-4 p-4 rounded-md"
          :class="{
            'bg-green-100 text-green-700': alertType === 'success',
            'bg-red-100 text-red-700': alertType === 'error'
          }"
        >
          {{ alertMessage }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../stores/auth'
  
  const router = useRouter()
  const authStore = useAuthStore()
  
  // 폼 데이터 상태
  const formData = reactive({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    role: 'USER' // 기본값으로 USER 설정
  })
  
  // 기타 상태
  const confirmPassword = ref('')
  const errors = reactive({})
  const isLoading = ref(false)
  const showAlert = ref(false)
  const alertType = ref('success')
  const alertMessage = ref('')
  
  // 유효성 검사 함수
  const validateForm = () => {
    errors.username = ''
    errors.password = ''
    errors.confirmPassword = ''
    errors.firstName = ''
    errors.lastName = ''
    let isValid = true
  
    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.username)) {
      errors.username = '올바른 이메일 형식을 입력해주세요'
      isValid = false
    }
  
    // 비밀번호 길이 검사
    if (formData.password.length < 6) {
      errors.password = '비밀번호는 최소 6자 이상이어야 합니다'
      isValid = false
    }
  
    // 비밀번호 확인 검사
    if (formData.password !== confirmPassword.value) {
      errors.confirmPassword = '비밀번호가 일치하지 않습니다'
      isValid = false
    }
  
    // 이름 길이 검사
    if (formData.firstName.length < 1) {
      errors.firstName = '이름을 입력해주세요'
      isValid = false
    }
  
    if (formData.lastName.length < 1) {
      errors.lastName = '성을 입력해주세요'
      isValid = false
    }
  
    return isValid
  }
  
  // 알림 메시지 표시 함수
  const showAlertMessage = (message, type = 'success') => {
    alertMessage.value = message
    alertType.value = type
    showAlert.value = true
    
    // 3초 후 알림 메시지 숨기기
    setTimeout(() => {
      showAlert.value = false
    }, 3000)
  }
  
  // 회원가입 처리 함수
  const handleSignup = async () => {
    if (!validateForm()) {
      return
    }
  
    try {
      isLoading.value = true
      await authStore.signup(formData)
      showAlertMessage('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.')
      
      // 잠시 후 로그인 페이지로 이동
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } catch (error) {
      showAlertMessage(
        error.response?.data?.message || '회원가입 중 오류가 발생했습니다.',
        'error'
      )
    } finally {
      isLoading.value = false
    }
  }
  </script>