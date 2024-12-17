<template>
  <li
    class="flex items-center justify-start pb-4 cursor-pointer"
    @mouseenter="isHover()"
    @mouseleave="isHover()"
  >
    <img
      :width="iconSize"
      :src="useAsset(icon)"
      :class="textIsHover ? 'bg-rose-400' : 'bg-white'"
    />
    <div
      :class="textIsHover ? 'text-rose-400' : 'text-white'"
      class="font-semibold text-[14px] ml-4 mt-0.5"
    >
      <span :class="route.path === pageUrl ? 'text-rose-400' : ''">
        {{ name }}
      </span>
    </div>
  </li>
</template>

<script setup>
const icon = ref(null);
const textIsHover = ref(false);
const route = useRoute();

const props = defineProps({
  iconString: {
    type: String,
    default: '',
  },
  iconSize: {
    type: Number,
    default: 0,
  },
  pageUrl: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
});

// 📌 이미지 변환
const useAsset = (icon) => {
  const assets = import.meta.glob('~/assets/images/icons/*.png', {
    eager: true,
    import: 'default',
  });
  return assets[`/assets/images/icons/${icon}.png`];
};

// 📌 네비 활성화, 비활성화
watchEffect(() => {
  if (route.path === props.pageUrl) {
    icon.value = props.iconString + '-active';
    textIsHover.value = true;
  } else {
    icon.value = props.iconString + '-inactive';
    textIsHover.value = false;
  }
});

// 📌 네비 호버, 비호버
const isHover = () => {
  if (icon.value === props.iconString + '-active') return;

  if (icon.value === props.iconString + '-inactive') {
    icon.value = props.iconString + '-inactive-hover';
    textIsHover.value = true;
  } else {
    icon.value = props.iconString + '-inactive';
    textIsHover.value = false;
  }
};
</script>

<style lang="css" scoped></style>
