<template>
  <!-- 카테고리 -->
  <section v-if="searchList.items.length === 0">
    <STitle>모두 둘러보기</STitle>

    <div
      class="categories grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 mx-4 mt-4"
    >
      <div v-for="item in categories.items">
        <CategorySelect
          :category="item.name"
          :image="item.icons[0].url"
          :key="item.id"
        />
      </div>
    </div>
  </section>

  <!-- 검색결과 -->
  <div v-else class="searchList">
    <!-- 텝 -->
    <div class="tab ml-4 pt-4">
      <ul class="flex gap-3">
        <li
          class="rounded-full py-2.5 px-4 bg-[#333] hover:bg-[#444] text-[14px] cursor-pointer active:text-[black] transition active"
        >
          모두
        </li>
        <li
          class="rounded-full py-2.5 px-4 bg-[#333] hover:bg-[#444] text-[14px] cursor-pointer active:text-[black] transition"
        >
          아티스트
        </li>
        <li
          class="rounded-full py-2.5 px-4 bg-[#333] hover:bg-[#444] text-[14px] cursor-pointer active:text-[black] transition"
        >
          플레이리스트
        </li>
        <li
          class="rounded-full py-2.5 px-4 bg-[#333] hover:bg-[#444] text-[14px] cursor-pointer active:text-[black] transition"
        >
          곡
        </li>
        <li
          class="rounded-full py-2.5 px-4 bg-[#333] hover:bg-[#444] text-[14px] cursor-pointer active:text-[black] transition"
        >
          앨범
        </li>
      </ul>
    </div>
    <!-- 상위 결과, 곡 -->
    <div class="flex items-center mb-6">
      <section class="search-result w-[420px]">
        <STitle>상위 결과</STitle>
        <div
          class="card mt-4 mx-4 p-5 bg-[#181818] hover:bg-[#333] transition ease-in rounded-md h-[240px] cursor-pointer"
        >
          <div
            class="profile-img rounded-full overflow-hidden w-[92px] h-[92px]"
          >
            <img
              :src="searchList.artists[0].images[0].url"
              :alt="searchList.artists[0].name"
              class="w-fit"
            />
          </div>
          <div class="artist-name mt-8">
            <strong class="text-[34px] font-bold">{{
              searchList.artists[0].name
            }}</strong>
            <p class="text-[16px] text-gray-300 mt-2">
              {{
                searchList.artists[0].type === 'artist'
                  ? '아티스트'
                  : searchList.artists[0].type
              }}
            </p>
          </div>
        </div>
      </section>
      <section class="search-songs grow">
        <STitle>곡</STitle>
        <!-- SongLow 컴포넌트 -->
        <SongRow :data="searchList.tracks" :height="240" />
      </section>
    </div>
    <!-- 아티스트 -->
    <Artist :data="searchList.artists" :icon="true" />
    <!-- 앨범 -->
    <Album date :data="searchList.albums" :icon="true" />
    <!-- 플레이리스트 -->
    <Playlist :data="searchList.playlists" :icon="true" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CommonStore } from '@/stores/pinia';
const route = useRoute();
const loading = ref(false);
const store = CommonStore();
const { $axios } = useNuxtApp();

const token = ref(null);
token.value = store.accessToken;

// 📌 Search
const searchList = reactive({
  items: [],
  artists: [],
  albums: [],
  playlists: [],
  tracks: [],
});

/*
 * 📌 get search list
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
    searchList.artists = response.data.artists.items;
    searchList.albums = response.data.albums.items;
    searchList.playlists = response.data.playlists.items;
    searchList.tracks = response.data.tracks.items.slice(0, 4);
  } catch (error) {
    error.value = 'Failed to search category' + error.message;
  }
};

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
  () => {
    getSearch(route.query.q);
  },
);
</script>
<style lang="css" scoped>
@import url('@/assets/css/components/search.css');
</style>
