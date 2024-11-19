<template>
   <!-- 메인 컨텐츠 -->
   <main class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">게시판</h1>
        <router-link 
          to="/board/write"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          글쓰기
        </router-link>
      </div>
  
      <!-- 검색 -->
      <div class="mb-6 flex gap-4">
        <select 
          v-model="searchKeyword"
          class="px-3 py-2 border rounded"
        >
          <option value="title">제목</option>
          <option value="content">내용</option>
        </select>
        <input 
          v-model="searchText"
          type="text"
          class="flex-1 px-3 py-2 border rounded"
          placeholder="검색어를 입력하세요"
        >
        <button 
          @click="handleSearch"
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          검색
        </button>
      </div>
  
      <!-- 게시글 목록 -->
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">번호</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성일</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">조회수</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="board in boards" :key="board.boardId">
              <td class="px-6 py-4 whitespace-nowrap">{{ board.boardId }}</td>
              <td class="px-6 py-4">{{ board.title }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(board.writedate) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ board.hit }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- 페이지네이션 -->
      <div class="mt-6 flex justify-center gap-2">
        <button
          v-for="page in pages"
          :key="page"
          @click="changePage(page)"
          :class="[
            'px-3 py-1 rounded',
            currentPage === page 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          ]"
        >
          {{ page }}
        </button>
      </div>
    </div>
    </main>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue'
  import { useBoardStore } from '@/stores/board'
  
  export default {
    setup() {
      const boardStore = useBoardStore()
      const searchKeyword = ref('title')
      const searchText = ref('')
  
      const boards = computed(() => boardStore.boards)
      const currentPage = computed(() => boardStore.currentPage)
      const pages = computed(() => {
        const pageCount = Math.ceil(boardStore.total / boardStore.pageSize)
        return Array.from({ length: pageCount }, (_, i) => i + 1)
      })
  
      const handleSearch = () => {
        boardStore.setSearch(searchKeyword.value, searchText.value)
        boardStore.fetchBoards()
      }
  
      const changePage = (page) => {
        boardStore.setPage(page)
        boardStore.fetchBoards()
      }
  
      const formatDate = (date) => {
        return new Date(date).toLocaleDateString()
      }
  
      onMounted(() => {
        boardStore.fetchBoards()
      })
  
      return {
        boards,
        currentPage,
        pages,
        searchKeyword,
        searchText,
        handleSearch,
        changePage,
        formatDate
      }
    }
  }
  </script>