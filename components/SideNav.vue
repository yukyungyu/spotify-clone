<template>
  <nav id="SideNav" class="h-[100%] p-6 w-[420px] fixed z-50 bg-black">
    <NuxtLink to="/">
      <img width="125" src="@/assets/images/icons/spotify-logo.png" />
    </NuxtLink>
    <div class="my-8"></div>
    <ul>
      <NuxtLink to="/">
        <MenuItem
          class="ml-[1px]"
          :iconSize="23"
          name="Home"
          iconString="home"
          pageUrl="/"
        />
      </NuxtLink>
      <NuxtLink to="/search">
        <MenuItem
          class="ml-[1px]"
          :iconSize="23"
          name="Search"
          iconString="search"
          pageUrl="/search"
        />
      </NuxtLink>
      <NuxtLink to="/library">
        <MenuItem
          class="ml-[1px]"
          :iconSize="23"
          name="Library"
          iconString="library"
          pageUrl="/library"
        />
      </NuxtLink>
      <div class="py-3.5"></div>
      <MenuItem
        :iconSize="24"
        name="Create Playlist"
        iconString="playlist"
        pageUrl="/playlist"
      />
      <MenuItem
        class="-ml-[1px]"
        :iconSize="27"
        name="Liked Songs"
        iconString="liked"
        pageUrl="/liked"
      />
    </ul>
    <div class="border-b border-b-gray-700"></div>
    <ul>
      <li class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white">
        My PlayList #1
      </li>
      <li class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white">
        My PlayList #2
      </li>
      <li class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white">
        My PlayList #3
      </li>
      <li class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white">
        My PlayList #4
      </li>
    </ul>
  </nav>
</template>

<script setup></script>

<style lang="css" scoped></style>
