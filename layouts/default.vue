<template>
  <Header />
  <SideNav />
  <div
    class="content-area fixed right-0 top-0 w-[calc(100%-420px)] px-4 pb-24 overflow-auto h-full bg-gradient-to-b from-[#1C1C1C] to-black"
  >
    <div class="mt-[70px]"></div>
    <slot />
    <div class="mb-100px"></div>
  </div>
  <MusicPlayer />
</template>
<style>
.content-area {
  /* background: #484158; */
  /* background: linear-gradient(90deg, #0e0425 0%, rgba(28, 28, 28, 1) 53%); */
}
</style>
