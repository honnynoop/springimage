<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="text-2xl font-bold text-indigo-600">
            Board System
          </router-link>
        </div>
        <div class="flex items-center space-x-4">
          <template v-if="!isAuthenticated">
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
            <template v-if="isAdmin">
              <router-link
                to="/admin"
                class="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                관리자
              </router-link>
            </template>
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
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const isAdmin = computed(() => authStore.isAdmin);

const handleLogout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>
