<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main class="h-full w-full px-4 py-10 text-center text-teal-700 dark:text-gray-200">
    <div class="flex items-center justify-center text-4xl">
      <span class="i-local-warning" />
    </div>
    <div>Not found</div>
    <div>
      <button class="m-3 text-sm btn" @click="router.back()">
        Back
      </button>
    </div>
  </main>
</template>
