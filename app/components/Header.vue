<script lang="ts" setup>
</script>

<template>
  <header class="relative h-10 bg-white shadow-sm md:h-[50px] md:flex dark:bg-gray-800 md:px-4">
    <input id="menu-toggle" type="checkbox" class="peer hidden">
    <label for="menu-toggle" class="h-full inline-flex items-center p-2 md:hidden">
      <div i-carbon-menu />
    </label>

    <div class="flex shrink-0 items-center max-md:absolute max-md:left-1/2 max-md:top-2 max-md:-translate-x-1/2">
      <img class="h-6 md:h-8" src="~/assets/images/main.jpg" alt="Logo">
    </div>
    <div class="mt-0 hidden md:block peer-checked:block md:flex-1 max-md:border-t max-md:border-gray-100 max-md:border-solid">
      <div class="flex rounded-md bg-white px-4 py-2 shadow-md md:ml-2 md:h-full md:flex-row max-md:flex-col md:items-center md:gap-4 md:py-0 md:shadow-none">
        <a href="#" class="h-7 font-medium hover:text-blue-600">Home</a>
        <a href="#" class="h-7 font-medium hover:text-blue-600">Product</a>
        <a href="#" class="h-7 font-medium hover:text-blue-600">About</a>
      </div>
    </div>

    <!-- 右侧操作区 -->
    <div class="hidden items-center md:flex">
      <!-- 用户头像 -->
      <div class="group relative ml-3">
        <img class="h-8 w-8 rounded-full" src="~/assets/images/main.jpg" alt="avatar">
        <div class="absolute right-0 z-[999] hidden w-56 origin-top-right group-hover:block">
          <div class="mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 dark:bg-gray-800">
            <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <a
                href="#"
                class="text-md block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                Settings
              </a>
              <a
                href="#"
                class="text-md block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                Account
              </a>
              <a
                href="#"
                class="text-md block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                <span class="flex flex-col">
                  Logout
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
</style>
