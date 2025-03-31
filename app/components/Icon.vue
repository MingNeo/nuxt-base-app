<script setup lang="ts">
import { Icon as Iconify } from '@iconify/vue'

const { icon, ssr = true } = defineProps<{
  icon: string
  ssr?: boolean
}>()
</script>

<template>
  <div v-if="icon.startsWith('local:')" :class="{ [`i-local-${icon.replace('local:', '')}`]: true }" />
  <Iconify v-else :icon="icon" :ssr="ssr" />
</template>
