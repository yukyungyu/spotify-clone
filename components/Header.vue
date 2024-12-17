<template>
  <header
    class="w-[calc(100%-420px)] h-[68px] fixed right-0 z-20 flex items-center justify-between bg-black"
  >
    <div class="flex items-center ml-6">
      <!-- search -->
      <div v-if="route.path === '/search'" class="relative">
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="어떤 콘텐츠를 감상하고 싶으세요?"
          class="search-box p-3 pl-10 ml-2 w-[320px] rounded-md flex items-center bg-[#2a2a2a]"
          @input="handleSearch"
        />
        <div class="icon-container">
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            class="Svg-sc-ytk21e-0 bHdpig TTmGm8qVTZIyhkzEGOq invert"
            viewBox="0 0 24 24"
          >
            <path
              d="M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z"
            ></path>
          </svg>
        </div>
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
<style lang="css" scoped>
input {
  color: #fff;
}
input:focus {
  box-shadow: 0 0 0 2px #fff;
  outline: none;
}
.icon-container {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  color: #fff;
  left: 4px;
  right: auto;
  z-index: 1;
  height: 48px;
  width: 48px;
}
.icon-container > svg {
  display: block;
  padding-inline: 12px;
}
</style>
