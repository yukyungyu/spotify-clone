<template>
  <!-- 카테고리 -->
  <div v-if="searchList.items.length === 0">
    <STitle>모두 둘러보기</STitle>

    <div
      class="categories grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 ml-4 mt-4"
    >
      <div v-for="item in categories.items">
        <CategorySelect
          :category="item.name"
          :image="item.icons[0].url"
          :key="item.id"
        />
      </div>
    </div>
  </div>

  <!-- 검색결과 -->
  <div v-else class="searchList">
    <!-- 텝 -->
    <div class="tab ml-4 pt-4">
      <ul class="flex gap-3">
        <li class="rounded-full py-2.5 px-4 bg-[#333] text-[14px] active">
          모두
        </li>
        <li class="rounded-full py-2.5 px-4 bg-[#333] text-[14px]">아티스트</li>
        <li class="rounded-full py-2.5 px-4 bg-[#333] text-[14px]">
          플레이리스트
        </li>
        <li class="rounded-full py-2.5 px-4 bg-[#333] text-[14px]">곡</li>
        <li class="rounded-full py-2.5 px-4 bg-[#333] text-[14px]">앨범</li>
      </ul>
    </div>
    <!-- 상위 결과, 곡 -->
    <div class="flex items-center">
      <section class="search-result">
        <div>상위 결과</div>
        <div class="card mt-2 rounded-sm"></div>
      </section>
      <section class="search-songs">
        <div>곡</div>
        <div class="song-list mt-2"></div>
      </section>
    </div>
    <!-- 아티스트 -->
    <Artist />
    <!-- 앨범 -->
    <Album />
    <!-- 플레이리스트 -->
    <Playlist />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CommonStore } from '@/stores/pinia';
const route = useRoute();
const loading = ref(false);

// 📌 Search
const searchList = reactive({
  items: [],
});

/*
 * q: 검색어
 * type: 'album', 'artist', 'track', 'playlist'
 */
const getSearch = async (query) => {
  try {
    const response = await $axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=album%2Cartist%2Ctrack%2Cplaylist`,
      {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    );
    // console.log('검색 결과:', response.data);
    searchList.items = response.data;
    console.log('2/searchList.items: ', searchList.items);
  } catch (error) {
    error.value = 'Failed to search category' + error.message;
  }
};

const store = CommonStore();
const { $axios } = useNuxtApp();

const token = ref(null);
token.value = store.accessToken;

const categories = reactive({
  items: [],
});

// 📌 get all category
const getAllCategory = async () => {
  try {
    const response = await $axios.get(
      'https://api.spotify.com/v1/browse/categories?locale=ko_KR',
      {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    );
    categories.items = response.data.categories.items;
  } catch (error) {
    error.value = 'Failed to fetch category ' + error.message;
  }
};

onMounted(() => {
  getAllCategory();
});
watch(
  () => route.query.q,
  (newQuery) => {
    // console.log('새로운 검색어: ', newQuery);
    getSearch(route.query.q);
  },
);
</script>
<style>
.tab > ul > li.active {
  background-color: #fff;
  color: #000;
}
</style>
