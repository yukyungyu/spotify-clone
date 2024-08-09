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
      <NuxtLink to="/library">
        <MenuItem
          class="ml-[1px]"
          :iconSize="24"
          name="내 라이브러리"
          iconString="library"
          pageUrl="/library"
        />
      </NuxtLink>
      <div class="py-3.5"></div>
    </ul>
    <div class="border-b border-b-gray-700"></div>
    <ul>
      <li class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white">
        플레이리스트
      </li>
    </ul>
  </nav>
</template>

<script setup></script>

<style lang="css" scoped></style>
