<template>
  <Header />
  <SideNav />
  <div
    class="fixed right-0 top-0 w-[calc(100%-420px)] overflow-auto h-full bg-gradient-to-b from-[#1C1C1C] to-black"
  >
    <div class="mt-[70px]"></div>
    <slot />
    <div class="mb-100px"></div>
  </div>
</template>
