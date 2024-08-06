<template>
  <section>
    <STitle v-if="route.path === '/'">인기 아티스트</STitle>
    <STitle v-else>아티스트</STitle>
    <SList 
      type="artist" 
      :data="artist"
      :icon="icon"
      :border-radius="true"
    />
  </section>
</template>

<script setup>
const { $axios } = useNuxtApp();
const route = useRoute();
import { CommonStore } from '@/stores/pinia';

const store = CommonStore();
const artist = ref([]);
const ids = ref(
`6HvZYsbFfjnjFrWF950C9d,6YVMFz59CuY7ngCxTxjpxE,36cgvBn0aadzOijnjjwqMN,3HqSLMAZ3g3d5poNaI7GOU,4TEK9tIkcoxib4GxT3O4ky,06HL4z0CvFAxyc27GXpf02,6qqNVTkY8uBg9cP3Jd7DAH,4SpbR6yFEvexJuaBpgAU5p,0Y2AcMPMpeuPXtPQGVvRBq,4XpUIb8uuNlIWVKmgKZXC0,1uNFoZAHBGtllmzznpCI3s,5TnQc2N1iKlFjYD7CPGvFc,1Xyo4u8uXC1ZmMpatF05PJ,66CXWjxzNUsdJxJ2JdwvnR,6VuMaDnrHyPL1p4EHjYLi7,2jOm3cYujQx6o1dxuiuqaX,1z4g3DjTBBZKhvAroFlhOM,0du5cEVh5yTK9QJze8zA0C,74KM79TiuVKeVCqs8QtB0B,246dkjvS1zLTtiykXe5h60`,
);
const local = ref('KR');

const getArtist = async () => {
  try {
    const { data } = await $axios.get(
      `https://api.spotify.com/v1/artists?ids=${ids.value}&offset=9&market=${local.value}`,
      {
        headers: {
          Authorization: `Bearer ${store.accessToken}`,
        },
      },
    ); 
    artist.value = data.artists;
    // console.log(data.artists,"artist")
  } catch (e) {
    console.error(e);
  }
};

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  icon: {
    type: Boolean,
    default: false, 
  }
});

watch(
  () => props.data,
  (newVal) => {
    artist.value = newVal;
  },
);


onMounted(() =>{
  if(store.isUser) {
    getArtist();
  }
})
</script>

<style lang="css" scoped></style>
