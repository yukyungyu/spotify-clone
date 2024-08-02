<template>
    <NuxtLink to="/library">
        <div v-if="randColor.color" :style="`background-color: ${randColor.color}`" class="categoryItem contrast-[2] brightness-[0.87] rounded-xl p-2 aspect-square relative overflow-hidden">
            <div class="text-white pt-3 pl-4 font-semibold text-[23px]">{{ category }}</div>
            <img class="absolute contrast-[0.55] -right-3.5 bottom-0 max-w-[100px] rotate-[20deg]" :src="image || ''" alt="">
        </div>
    </NuxtLink>
</template>

<script setup>
import uniqolor from 'uniqolor';

let randColor = ref('')
randColor.value = uniqolor.random()

const props = defineProps({
    category: { type: String, required: true },
    image: { type: String, default: '' },
})
const { category } = toRefs(props)

</script>

<style lang="scss" scoped>

</style>