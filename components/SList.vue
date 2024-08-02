ß<template>
  <section class="list_wrap">
    <ul ref="list" class="list_box">
      <li v-for="(item,index) in items" :key="index" class="hover:bg-zinc-900">
        <a :href="item.href" class="">
          <img 
            class="px-5 py-5"
            :src="item.images[0].url" 
            :alt="item.name" 
            :width="item.images[0].width" 
            :height="item.images[0].height" 
          />
          <h3 class="px-2 pt-2">{{ item.name }}</h3>
          <p class="px-2 pb-2 text-gray-400 text-sm">{{ item.release_date }}</p>
        </a>
      </li>
    </ul>
  </section> 
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})
const items = computed(() => props.data)
const list = ref('')
  
// 📌 데이터 내려받기
watch(() => props.data, async () => {
  await nextTick(); 
  adjustItems();
}, { immediate: true });

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
 

  data.forEach(item => {
    item.classList.remove('hidden');
  });

  data.forEach(item => {
    totalWidth += item.offsetWidth;
    if (totalWidth > containerWidth) {
      item.classList.add('hidden'); 
    }
  });
};
</script>

<style lang="css" scoped> 
@import url('@/assets/css/components/list.css');
</style>