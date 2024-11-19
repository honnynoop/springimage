<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">글쓰기</h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">제목</label>
          <input
            v-model="title"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">내용</label>
          <textarea
            v-model="content"
            rows="10"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          ></textarea>
        </div>

        <div class="flex justify-end space-x-4">
          <router-link
            to="/board"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            취소
          </router-link>
          <button
            type="submit"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useBoardStore } from "@/stores/board";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const boardStore = useBoardStore();
    const authStore = useAuthStore();

    const title = ref("");
    const content = ref("");

    const handleSubmit = async () => {
  try {
    // memberId가 undefined인지 확인
    const memberId = authStore.getMemberId;
    if (!memberId) {
      alert('사용자 정보를 찾을 수 없습니다.');
      return;
    }

    const result = await boardStore.addBoard({
      memberId,
      title: title.value,
      boardcontent: content.value,
    });

    if (result) {
      alert('게시글이 성공적으로 작성되었습니다.');
      router.push('/board'); // 목록 페이지로 이동
    } else {
      alert('게시글 작성에 실패했습니다.');
    }
  } catch (error) {
    console.error('게시글 작성 중 오류 발생:', error);
    alert('게시글 작성 중 오류가 발생했습니다.');
  }
}

    return {
      title,
      content,
      handleSubmit,
    };
  },
};
</script>
