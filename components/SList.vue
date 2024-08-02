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
    required: true
  }
})
const items = computed(() => props.data)
const list = ref('')

// onMounted(() => {  
//   adjustItems();
//   window.addEventListener('resize', adjustItems);
// });

// onBeforeUnmount(() => {
//   window.removeEventListener('resize', adjustItems);
// });
 
 
const adjustItems = () => { 
  if (!list.value) return; 
 
  const containerWidth = list.value.offsetWidth
  const albumList = list.value.children 
  let totalWidth = 0;  
  console.log(list,"dd")
  console.log(albumList.length,"dd")

  for (let i = 0; i < albumList.length; i++) { 
    console.log('remove')
      albumList[i].classList.remove('hidden');  
  } 
  for(let i = 0; i < albumList.length; i++){ 
    totalWidth += albumList[i].offsetWidth
    if(totalWidth > containerWidth) {
      console.log('add')
      albumList[i].classList.add('hidden')
    }
  } 
}

</script>

<style lang="css" scoped> 
.list_wrap {
  display: flex;
  max-width: 100%;
  min-width: 100%;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
  -webkit-box-flex: 1;
  contain-intrinsic-size: auto 260px;
  container-type: inline-size;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  min-height: 260px;
}
.list_box {  
  display: grid;
  box-sizing: border-box;
  grid-template-rows: repeat(1, minmax(0, 1fr));
  grid-template-columns: repeat(auto-fill, minmax(260px,1fr));
} 

</style>