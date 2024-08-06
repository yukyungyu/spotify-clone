<template>
  <section class="list_wrap">
    <ul ref="list" :class="`list_box ${type} ${borderRadius ? 'circle' : ''}`">
      <li v-for="(item, index) in items" :key="index" class="hover:bg-zinc-900">
        <a :href="item.href" class="">
          <img
            class="px-5 py-5"
            :src="item.images[0]?.url"
            :alt="item.name"
            :width="item.images[0]?.width"
            :height="item.images[0]?.height"
          />
          <template v-if="type === 'album'">
            <h3 class="px-5 pt-2">{{ item.name }}</h3>  
            <p v-if="!date" class="px-5 p-2 text-gray-400 text-sm">{{ item.artists[0].name }}</p> 
            <p v-else class="px-5 p-2 text-gray-400 text-sm">
              <span class="dot inline-block mr-5">{{ format(new Date(item.release_date), 'yyyy') }}</span>
              <span>{{ item.artists[0].name }}</span>
            </p>  
          </template>
          <template v-if="type === 'artist'">
            <h3 class="px-5 pt-2">{{ item.name }}</h3> 
            <p class="px-5 p-2 text-gray-400 text-sm">{{ item.type === 'artist' ? '아티스트' : '' }}</p> 
          </template> 
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { format } from 'date-fns';

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
    type: Date || Booean,
    default: new Date() || false,
  },
});
const items = computed(() => props.data);
const list = ref(''); 
 

// 📌 데이터 내려받기
watch(
  () => props.data,
  async () => {
    await nextTick();
    adjustItems();
  },
  { immediate: true },
);

// 📌 resize, 마운트 설정
onMounted(async () => {
  await nextTick();
  adjustItems();
  window.addEventListener('resize', adjustItems);
});

// 📌 마운트 종료
onBeforeUnmount(() => {
  window.removeEventListener('resize', adjustItems);
});

// items 이 resize 됐을 때 줄어들게 설정
const adjustItems = () => {
  if (!list.value) return;

  let totalWidth = 0;
  const containerWidth = list.value.offsetWidth;
  const data = Array.from(list.value.children);
  const windowWidth = window.innerWidth;


  data.forEach((item) => {
    item.classList.remove('hidden');
  });

  data.forEach((item) => {
    totalWidth += item.offsetWidth; 
    // console.log(totalWidth, containerWidth) 
    if (totalWidth > containerWidth && totalWidth !== 0) {
      item.classList.add('hidden');
    }
    if(windowWidth < 768) {
      data[0].classList.remove('hidden');
    }
  });
};
</script>

<style lang="css" scoped>
@import url('@/assets/css/components/list.css');
</style>
