<script lang="ts" setup>
const { type = 'dots' } = defineProps<{
  type?: 'dots' | 'spin'
}>()
</script>

<template>
  <div v-if="type === 'spin'" class="h-5 w-5 animate-spin animate-duration-1500 border-[3px] border-blue-200 border-t-blue-500 rounded-full border-solid" />
  <div v-else class="flex space-x-2">
    <div class="bg-primary h-1.5 w-1.5 animate-[dots_1.4s_ease-in-out_infinite] rounded-full" />
    <div class="bg-primary h-1.5 w-1.5 animate-[dots_1.4s_ease-in-out_infinite] animate-delay-200 rounded-full" />
    <div class="bg-primary h-1.5 w-1.5 animate-[dots_1.4s_ease-in-out_infinite] animate-delay-500 rounded-full" />
  </div>
</template>

<style lang="scss">
@keyframes dots {
  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
}
</style>
