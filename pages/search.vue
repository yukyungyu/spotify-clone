<template>
  <STitle>모두 둘러보기</STitle>

  <div
    class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 ml-4 mt-4"
  >
    <div v-for="item in categories.items">
      <CategorySelect
        :category="item.name"
        :image="item.icons[0].url"
        :key="item.id"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CommonStore } from '@/stores/pinia';
const route = useRoute();
const query = route.query.q;
const loading = ref(false);

// 📌 Search
const searchList = reactive({
  items: [],
});

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
    console.log('검색 결과:', response.data);
    searchList.items = response.data;
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
if (query) {
  getSearch(query);
}
</script>
