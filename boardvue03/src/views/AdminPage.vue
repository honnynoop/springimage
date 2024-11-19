<template>
  <!-- 메인 컨텐츠 -->
  <main class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <AdminBoard />
        </div>
      </main>
</template>

<script>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AdminBoard from "@/components/AdminBoard.vue";

export default {
  components: {
    AdminBoard,
  },

  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const logout = async () => {
      await authStore.logout();
      router.push("/login");
    };

    return {
      logout,
    };
  },
};
</script>
