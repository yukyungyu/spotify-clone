<template>
  <Header />
  <SideNav />
  <main
    id="main"
    class="fixed right-0 top-0 w-[calc(100%-360px)] px-4 pb-24 overflow-auto h-full bg-gradient-to-b from-[#1C1C1C] to-black"
  >
    <div class="mt-[70px]"></div>
    <slot />
    <div class="mb-100px"></div>
  </main>
  <MusicPlayer />
</template>
<style></style>
