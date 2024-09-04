<template>
  <i class="icon">
    <img :src="images[i]" alt="icon" loading="lazy" />
  </i>
</template>

<script setup lang="ts">
import { filename } from 'pathe/utils'

const { i } = defineProps({
  i: String
})
const glob = import.meta.glob('@/shared/assets/icons/*.svg', { eager: true })
const images = Object.fromEntries(Object.entries(glob).map(([key, value]) => [filename(key), value.default]))
</script>
