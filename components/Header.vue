<template>
  <header
    class="w-[calc(100%-360px)] h-[68px] fixed right-0 z-20 bg-[#101010] bg-opacity-20 flex items-center justify-between"
  >
    <div class="flex items-center">
      <div class="flex items-center ml-6">
        <button
          type="button"
          class="rounded-full bg-black p-[1px] cursor-pointer"
        >
          <ChevronLeft fillColor="#FFFFFF" :size="30" />
        </button>
        <button
          type="button"
          class="rounded-full bg-black p-[1px] ml-4 cursor-pointer"
        >
          <ChevronRight fillColor="#FFFFFF" :size="30" />
        </button>
      </div>
      <!-- search -->
      <div v-if="route.path === '/search'">
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="어떤 콘텐츠를 감상하고 싶으세요?"
          class="search-box p-3 ml-2 w-[320px] rounded-full bg-[#333333] flex items-center"
          @input="handleSearch"
        />
      </div>
    </div>
    <!-- 로그인 -->
    <button
      @click="openMenu = !openMenu"
      :class="openMenu ? 'bg-[#282828]' : 'bg-black'"
      class="bg-black hover:bg-[#282828] rounded-full p-0.5 mr-8 mt-0.5 cursor-pointer"
    >
      <div class="flex items-center">
        <div class="rounded-full overflow-hidden bg-[#f8f8f8]" width="27">
          <img width="27" src="@/assets/images/icons/user_icon.png" />
        </div>
        <div class="text-white text-[14px] ml-1.5 font-medium">
          {{ store.isUser ? store.name : '로그인이 필요합니다' }}
        </div>
        <ChevronDown
          v-if="!openMenu"
          @click="openMenu = true"
          fillColor="#FFFFFF"
          :size="25"
        />
        <ChevronUp
          v-else
          @click="openMenu = false"
          fillColor="#FFFFFF"
          :size="25"
        />
      </div>
    </button>

    <span
      v-if="openMenu"
      class="fixed w-[190px] bg-[#282828] shadow-2xl z-50 rounded-sm top-[52px] right-[35px] p-1 cursor-pointer"
    >
      <ul class="text-gray-200 font-semibold text-[14px]">
        <li class="px-3 py-2.5 hover:bg-[#3E3D3D] border-b border-b-gray-600">
          Profile
        </li>
        <li class="px-3 py-2.5 hover:bg-[#3E3D3D]">
          <button @click="LogOut">
            {{ !store.isUser ? 'Login' : 'LogOut' }}
          </button>
        </li>
      </ul>
    </span>
  </header>
</template>

<script setup>
import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
import { CommonStore } from '@/stores/pinia';
import { useRouter, useRoute } from 'vue-router';

let openMenu = ref(false);
const searchKeyword = ref('');
const store = CommonStore();
const router = useRouter();
const route = useRoute();

// 📌 search 페이지에서 나가면 검색어 초기화
const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    router.push({ path: '/search', query: { q: searchKeyword.value } });
  }
};

// 📌 로그아웃
const LogOut = () => {
  store.logOut({
    accessToken: '',
    refreshToken: '',
    isUser: false,
  });
  router.push('/login');
};

onUnmounted(() => {
  searchKeyword.value = '';
});
watch(
  () => route.path,
  () => {
    if (route.path !== '/search') {
      searchKeyword.value = '';
    }
  },
);
</script>
<style>
input:focus {
  box-shadow: 0 0 0 2px #fff;
  outline: none;
}
</style>
