<template>
  <article class="flex border-box w-[100%] relative py-2 overflow-hidden">
    <!-- 앨범, 플레이리스트 -->
    <template v-if="typeName.some((item) => [items.type].includes(item.type))">
      <img
        :src="items.images[0].url"
        class="max-w-[280px] w-[35%] min-w-[15rem] h-[max-content] rounded-md reative"
      />
      <div
        class="flex flex-col justify-center ml-5 sm:justify-end whitespace-nowrap"
      >
        <p
          v-for="(item, index) in typeName"
          :key="index"
          class="text-[1.3rem] sm:text-[1rem] mb-3 --white-opacity-7"
        >
          <template v-if="items.type === item.type">
            {{ item.name }}
          </template>
        </p>
        <h2 class="font-trends text-9xl sm:text-[3rem] whitespace-nowrap">
          {{ items.name }}
        </h2>
        <!-- 앨범 -->
        <div v-if="items.type === 'album'" class="flex mt-2 sm:mb-5">
          <span class="dot mr-4 text-[1.3rem] sm:text-[1rem]">{{
            items.artists[0].name
          }}</span>
          <span class="dot mr-4 text-[1.3rem] sm:text-[1rem]">{{
            items.release_date && computedDate(items.release_date)
          }}</span>
          <span class="dot mr-4 text-[1.3rem] sm:text-[1rem]"
            >{{ items.total_tracks }}곡</span
          >
          <span class="mr-1 text-[1.3rem] sm:text-[1rem]"
            >{{ time.min }}분</span
          >
          <span class="text-[1.3rem] sm:text-[1rem]">{{ time.sec }}초</span>
        </div>
        <!-- 플레이리스트 -->
        <div v-if="items.type === 'playlist'" class="flex flex-col">
          <div
            class="playlist-tag mt-2 text-[1.3rem] sm:text-[1rem] mb-0 --white-opacity-7"
          >
            <span>{{ items.description }}</span>
          </div>
          <div
            class="playlist-info flex mt-2 text-[1.3rem] sm:text-[1rem] sm:mb-5 mb-0 --white-opacity-7"
          >
            <span class="font-semibold">{{ items.owner.display_name }} </span>
            <span class="total-cnt mx-4">{{ items.tracks.total }}곡</span>
          </div>
        </div>
      </div>
      <div :style="thumbnailBg" class="thumbnail"></div>
    </template>
    <!-- 아티스트 -->
    <template v-if="route.path.includes('/artist')">
      <div class="w-[100%] overflow-hidden rounded-md h-[300px]">
        <div :style="thumbnailBgArtist"></div>
        <div class="absolute bottom-5 left-5">
          <div>
            <i class="star" />
            <span>인증된 아티스트</span>
          </div>
          <h2 class="font-klein mr-4 text-[9rem] sm:text-[0.8rem]">
            {{ items.name }}
          </h2>
          <div>
            <span>월별리스너</span
            ><span>{{ items.followers.total.toLocaleString() }}명</span>
          </div>
        </div>
      </div>
    </template>
    <!-- 카테고리 -->
    <template v-if="route.path.includes('/category')">
      <div
        v-if="randColor.color"
        class="w-[100%] min-w-[10rem] rounded-md"
        :style="`background-color: ${randColor.color}`"
      ></div>
    </template>
  </article>
</template>

<script setup>
import { format as dateFormat } from 'date-fns';
import uniqolor from 'uniqolor';

let randColor = ref('');
randColor.value = uniqolor.random();

const route = useRoute();
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  title: {
    type: String,
    default: '',
  },
});
const items = reactive({
  images: [
    {
      url: '',
    },
  ],
  name: '',
  followers: {
    total: 0,
  },
  artists: [
    {
      name: '',
    },
  ],
  type: '',
  tracks: [
    {
      duration_ms: 0,
    },
  ],
  total_tracks: '',
  description: '',
  release_date: '',
  owner: '',
});

const time = reactive({
  min: 0,
  sec: 0,
  total: 0,
});

// 📌 배경 블러처리
const thumbnailBg = computed(() => ({
  position: 'absolute',
  zIndex: '-1',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  background: `linear-gradient(transparent 0px, rgba(0, 0, 0, 0.5) 100%) center top / 100%, url(${items.images[0].url}) no-repeat`,
  filter: 'blur(70px)',
}));

const thumbnailBgArtist = computed(() => ({
  position: 'absolute',
  zIndex: '-1',
  width: '100%',
  height: '100%',
  background: `url(${items.images[0].url}) center center / 100% no-repeat fixed`,
}));

// 📌 타입이름
const typeName = ref([
  {
    type: 'album',
    name: '앨범',
  },
  {
    type: 'playlist',
    name: '플레이리스트',
  },
]);

// 📌 날짜 변환
const computedDate = (date) => dateFormat(new Date(date), 'yyyy');

// 📌 시간 변환
const totalPlayTimes = () => {
  items.tracks.items.forEach((item) => {
    time.total += item.duration_ms;
  });
  time.min = Math.floor(time.total / (1000 * 60));
  time.sec = Math.floor((time.total % (1000 * 60)) / 1000);
};

watch(
  () => props.data,
  (newVal) => {
    const {
      type = '',
      images = [],
      name = '',
      followers = { total: 0 },
      artists = [],
      total_tracks = '',
      description = '',
      owner = { display_name: '' },
      release_date = '',
      tracks = { items: [], total: 0 },
    } = newVal;

    Object.assign(items, {
      type,
      images,
      name,
      artists,
      followers,
      total_tracks,
      description,
      owner,
      release_date,
      tracks,
    });
    console.log('newVal', newVal);

    totalPlayTimes();
  },
);
</script>

<style lang="css" scoped>
.total-cnt {
  position: relative;
}
.total-cnt::before {
  position: absolute;
  content: '•';
  margin-left: -14px;
}
</style>
