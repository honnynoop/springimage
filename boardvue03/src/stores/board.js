// stores/board.js
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBoardStore = defineStore('board', () => {
  // 상태 정의
  const boards = ref([])
  const total = ref(0)
  const currentPage = ref(1)
  const pageSize = ref(10)
  const keyword = ref('')
  const search = ref('')
  const loading = ref(false)
  const error = ref(null)

  // computed 속성
  const totalPages = computed(() => Math.ceil(total.value / pageSize.value))
  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPrevPage = computed(() => currentPage.value > 1)

  // 게시글 목록 조회
  const fetchBoards = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.post('/api/board/page', {
        pageNum: currentPage.value,
        pageSize: pageSize.value,
        keyword: keyword.value,
        search: search.value
      })
      
      boards.value = response.data.list
      total.value = response.data.total
      return response.data
    } catch (err) {
      error.value = err.message
      console.error('Failed to fetch boards:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // 게시글 작성
  const addBoard = async ({ memberId, title, boardcontent }) => {
    loading.value = true
    error.value = null

    try {
      alert(`${memberId}, ${title}, ${boardcontent}`)
      const response = await axios.post('/api/board/add', {
        memberId,
        title,
        boardcontent
      })
      
      await fetchBoards()
      loading.value = false
      return true
    } catch (err) {
      error.value = err.message
      console.error('게시글 작성 실패:', err)
      loading.value = false
      return false
    }
  }

  // 페이지 설정
  const setPage = (page) => {
    currentPage.value = page
    return fetchBoards()
  }

  // 검색 조건 설정
  const setSearch = (newKeyword, newSearch) => {
    keyword.value = newKeyword
    search.value = newSearch  
    currentPage.value = 1
    return fetchBoards()
  }

  // 상태 초기화
  const resetState = () => {
    currentPage.value = 1
    keyword.value = ''
    search.value = ''
    boards.value = []
    total.value = 0
  }

  return {
    // 상태
    boards,
    total,
    currentPage,
    pageSize,
    keyword,
    search,
    loading,
    error,
    
    // computed
    totalPages,
    hasNextPage,
    hasPrevPage,
    
    // 액션
    fetchBoards,
    addBoard,
    setPage,
    setSearch,
    resetState
  }
})