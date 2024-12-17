<template>
  <section class="list_wrap">
    <ul ref="list" :class="`list_box ${type}`">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="hover:bg-[#ffffff1a] rounded px-3 py-2"
      >
        <NuxtLink :to="{ path: `/${type}/${item.id}` }">
          <div :class="icon ? 'play_icon' : 'no_icon'">
            <img
              class="thumbnail"
              :src="item.images[0].url"
              :alt="item.name"
              :width="
                item.images[0].width !== null ? item.images[0].width : '100%'
              "
              :height="
                item.images[0].height !== null ? item.images[0]?.height : '100%'
              "
            />
            <button @click="play">재생</button>
          </div>
          <template v-if="type === 'album'">
            <h3 class="title pt-5 pb-2 text-black font-semibold">
              {{ item.name }}
            </h3>
            <p v-if="!date" class="add-info pb-5 text-gray-500 text-sm">
              {{ item.artists[0].name }}
            </p>
            <p v-else class="add-info pb-5 text-gray-500 text-sm">
              <span class="dot inline-block mr-5">{{
                format(new Date(item.release_date), 'yyyy')
              }}</span>
              <span>{{ item.artists[0].name }}</span>
            </p>
          </template>
          <template v-if="type === 'artist'">
            <h3 class="title pt-5 pb-2 text-black font-semibold">
              {{ item.name }}
            </h3>
            <p class="add-info pb-5 text-gray-500 text-sm">
              {{ item.type === 'artist' ? 'Artist' : '' }}
            </p>
          </template>
          <template v-if="type === 'playlist'">
            <h3 class="title pt-5 pb-2 text-black font-semibold">
              {{ item.name }}
            </h3>
            <p class="add-info pb-5 text-gray-500 text-sm">
              {{ ellipsis(item.description) }}
            </p>
          </template>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { format } from 'date-fns';
const list = ref(null);
const items = ref([]);
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  type: {
    type: String,
    default: '',
  },
  borderRadius: {
    types: Boolean,
    default: false,
  },
  date: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: Boolean,
    default: false,
  },
});

// 📌 이미지 resize 처리
const adjustItems = () => {
  if (!list.value) return false;

  let totalWidth = 0;
  const containerWidth = list.value.clientWidth;
  const childrenWidth = Array.from(list.value.children || []);
  const windowWidth = window.innerWidth;

  childrenWidth.forEach((item) => {
    item.classList.remove('hidden');
  });

  childrenWidth.forEach((item) => {
    totalWidth += item.clientWidth;
    // console.log(item.clientWidth, containerWidth, 'width');
    if (totalWidth - +5 > containerWidth) {
      item.classList.add('hidden');
    }
    if (windowWidth <= 768) {
      if (childrenWidth.length > 0) {
        childrenWidth[0].classList.remove('hidden');
      }
    }
  });
};

// 📌 ...으로 표시하기
const ellipsis = (text, length = 42) => {
  if (text.length > length) {
    text = text.substr(0, length - 2) + '...';
  }
  return text;
};

// 📌 데이터 내려받기
watch(
  () => props.data,
  async (newVal) => {
    items.value = newVal;
    await nextTick();
    adjustItems();
  },
);

// 📌 resize, 마운트 설정
onMounted(() => {
  window.addEventListener('resize', adjustItems);
});

// 📌 마운트 종료
onBeforeUnmount(() => {
  window.removeEventListener('resize', adjustItems);
});
</script>

<style lang="css" scoped>
@import url('@/assets/css/components/list.css');
</style>
