<template>
  <section>
    <STitle v-if="route.path === '/'">인기앨범</STitle>
    <STitle v-else>앨범</STitle>
    <SList 
      type="album" 
      :data="album" 
      :icon="icon"
      :date="date"  
    />
  </section>
</template>

<script setup>
const { $axios } = useNuxtApp();
const route = useRoute();
import { CommonStore } from '@/stores/pinia';

const store = CommonStore();
const album = ref([]);
const ids = ref(
  `5pSk3c3wVwnb2arb6ohCPU,15XcLhiVMlSOipUddTNDnr,700oyQvND1pNIADYqOkrre,1FVw30SoC91lq1UZ6N9rwN,6zXydimgenc15N3LWmf0cn,7ixOAT89NSsgUITYc5ByB5,0EhZEM4RRz0yioTgucDhJq,3gHhPm8z8tid1kvpniUKuK,7v4sqd0NZ9Fm8HnwCcCGIs,18U7qF5UYXzGP5C11y9rmq,0vZCxyaV5c4lcHqds3xfts,2PcM535knJOZb6MUth8axj,53985D8g3JcGBoULSOYYKX,1Sf3c8MEe4cXaxZzOKgnhc,7KIwUrSiA0gc9WlI7AYIfZ,3auDI7RSdoJr99qMNXimP4,6Msc3BwzKZ5f5FXmKuUSu6,6irebIc6UO8fN0jl4UlzBS,7aJuG4TFXa2hmE4z1yxc3n,3p68B7ZhETVmNbOov8JcF5`,
);
const local = ref('KR');

const getAlbum = async () => {
  try {
    const { data } = await $axios.get(
      `https://api.spotify.com/v1/albums?ids=${ids.value}&offset=9&market=${local.value}`,
      {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    );
    album.value = data.albums;
    // console.log(data.albums,"albums");
  } catch (e) {
    console.error(e);
  }
};

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  date: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: Boolean,
    default: false, 
  }
});

watch(
  () => props.data,
  (newVal) => {
    album.value = newVal;
  },
);
onMounted(() => {
  if (store.isUser) {
    getAlbum();
  }
});
</script>

<style lang="css" scoped></style>
