<template>
  <div v-if="items.images?.length > 0" class="relative flex pt-3">
    <img
      :src="items.images[0]?.url"
      :alt="items.name"
      class="max-w-[280px] w-[35%] min-w-[10rem] h-[max-content] rounded-md"
    />
    <div
      class="flex flex-col justify-center ml-5 sm:justify-end whitespace-nowrap"
    >
      <p v-for="item in typeName" class="text-lg text-[1rem] sm:text-[0.8rem]">
        <template v-if="items.type === item.type">
          {{ item.name }}
        </template>
      </p>
      <h2 class="text-9xl font-bold md:text-[6rem] sm:text-[2rem]">
        {{ items.name }}
      </h2>
      <div class="flex">
        <!-- <img
          class="mr-4"
          :src="items.artists[0].href"
          :alt="items.artists[0].name"
        /> -->
        <span class="dot mr-4 text-lg text-[1rem] sm:text-[0.8rem]">{{
          items.artists[0].name
        }}</span>
        <span class="dot mr-4 text-lg text-[1rem] sm:text-[0.8rem]">{{
          format(new Date(items.release_date), 'yyyy')
        }}</span>
        <span class="dot mr-4 text-lg text-[1rem] sm:text-[0.8rem]"
          >{{ items.tracks.total }}곡</span
        >
        <span class="mr-1 text-lg text-[1rem] sm:text-[0.8rem]"
          >{{ time.min }}분</span
        >
        <span class="text-lg text-[1rem] sm:text-[0.8rem]"
          >{{ time.sec }}초</span
        >
      </div>
    </div>
    <div :style="thumbnailStyle" class="thumbnail"></div>
  </div>
</template>

<script setup>
import { format } from 'date-fns';
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});

const typeName = ref([
  {
    type: 'album',
    name: '앨범',
  },
  {
    type: 'artist',
    name: '아티스트',
  },
]);
const items = ref({});

const time = ref({
  min: 0,
  sec: 0,
});

const thumbnailStyle = computed(() => ({
  position: 'absolute',
  zIndex: '-1',
  width: '100%',
  height: '100%',
  background: `linear-gradient(transparent 0, rgba(0, 0, 0, 0.5) 100%), url(${items.value.images[0]?.url}) no-repeat`,
  backgroundSize: '100%',
  backgroundPosition: 'top',
  filter: 'blur(70px)',
}));
watch(
  () => props.data,
  (newData) => {
    let totalTime = 0;
    items.value = newData;
    console.log(items.value);
    items.value.tracks.items.map((item) => {
      totalTime += item.duration_ms;
      time.value.min = Math.floor(totalTime / (1000 * 60));
      time.value.sec = Math.floor((totalTime % (1000 * 60)) / 1000);
    });
    // console.log(time, 'item');
  },
);
</script>

<style lang="css" scoped></style>
