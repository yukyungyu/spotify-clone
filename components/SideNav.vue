<template>
  <nav id="SideNav" class="h-[100%] p-6 w-[360px] fixed z-50 bg-black">
    <NuxtLink to="/">
      <img width="125" src="@/assets/images/icons/spotify-logo.png" />
    </NuxtLink>
    <div class="my-8"></div>
    <ul>
      <NuxtLink to="/">
        <MenuItem
          class="ml-[1px]"
          :iconSize="24"
          name="홈"
          iconString="home"
          pageUrl="/"
        />
      </NuxtLink>
      <NuxtLink to="/search">
        <MenuItem
          class="ml-[1px]"
          :iconSize="24"
          name="검색하기"
          iconString="search"
          pageUrl="/search"
        />
      </NuxtLink>
      <div class="py-3.5"></div>
    </ul>
    <div class="border-b border-b-gray-700"></div>
    <MyPlaylist v-if="store.isUser" />
  </nav>
</template>

<script setup>
import { CommonStore } from '@/stores/pinia';

const store = CommonStore();
</script>

<style lang="css" scoped></style>
