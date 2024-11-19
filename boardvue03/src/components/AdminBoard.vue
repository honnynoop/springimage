<template>
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold mb-6">관리자 게시판 관리</h2>
      
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex gap-4 mb-6">
          <select 
            v-model="pageSize" 
            class="px-3 py-2 border rounded"
            @change="handlePageSizeChange"
          >
            <option value="10">10개씩</option>
            <option value="20">20개씩</option>
            <option value="50">50개씩</option>
          </select>
  
          <input 
            v-model="keyword"
            type="text"
            placeholder="검색어"
            class="px-3 py-2 border rounded flex-1"
          >
          
          <select 
            v-model="searchType"
            class="px-3 py-2 border rounded"
          >
            <option value="title">제목</option>
            <option value="content">내용</option>
          </select>
  
          <button 
            @click="handleSearch"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            검색
          </button>
        </div>
  
        <table class="min-w-full">
          <thead>
            <tr class="bg-gray-50">
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작성자ID
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                제목
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                내용
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작성일
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                조회수
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                관리
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="board in boards" :key="board.boardId">
              <td class="px-6 py-4">{{ board.boardId }}</td>
              <td class="px-6 py-4">{{ board.memberId }}</td>
              <td class="px-6 py-4">{{ board.title }}</td>
              <td class="px-6 py-4">{{ board.boardcontent }}</td>
              <td class="px-6 py-4">{{ formatDate(board.writedate) }}</td>
              <td class="px-6 py-4">{{ board.hit }}</td>
              <td class="px-6 py-4">
                <button 
                  @click="deleteBoard(board.boardId)"
                  class="text-red-600 hover:text-red-900"
                >
                  삭제
                </button>
              </td>
            </tr>
          </tbody>
        </table>
  
        <div class="mt-4 flex justify-center gap-2">
          <button
            v-for="page in totalPages"
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
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue'
  import { useBoardStore } from '@/stores/board'
  
  export default {
    setup() {
      const boardStore = useBoardStore()
      
      const pageSize = ref(10)
      const keyword = ref('')
      const searchType = ref('title')
      const currentPage = ref(1)
      const totalItems = ref(0)
  
      const boards = computed(() => boardStore.boards)
      const totalPages = computed(() => 
        Math.ceil(totalItems.value / pageSize.value)
      )
  
      const fetchBoards = async () => {
        try {
          const response = await boardStore.fetchBoards({
            pageNum: currentPage.value,
            pageSize: pageSize.value,
            keyword: searchType.value,
            search: keyword.value
          })
          totalItems.value = response.total
        } catch (error) {
          console.error('게시글 조회 실패:', error)
        }
      }
  
      const handlePageSizeChange = () => {
        currentPage.value = 1
        fetchBoards()
      }
  
      const handleSearch = () => {
        currentPage.value = 1
        fetchBoards()
      }
  
      const changePage = (page) => {
        currentPage.value = page
        fetchBoards()
      }
  
      const deleteBoard = async (boardId) => {
        if (confirm('정말 삭제하시겠습니까?')) {
          try {
            await boardStore.deleteBoard(boardId)
            fetchBoards()
          } catch (error) {
            console.error('게시글 삭제 실패:', error)
            alert('게시글 삭제에 실패했습니다.')
          }
        }
      }
  
      const formatDate = (date) => {
        return new Date(date).toLocaleDateString()
      }
  
      onMounted(fetchBoards)
  
      return {
        boards,
        pageSize,
        keyword,
        searchType,
        currentPage,
        totalPages,
        handlePageSizeChange,
        handleSearch,
        changePage,
        deleteBoard,
        formatDate
      }
    }
  }
  </script>