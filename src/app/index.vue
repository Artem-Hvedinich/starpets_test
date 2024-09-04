<template>
  <Header />
  <main class="wrapper">
    <RouterView />
  </main>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Header } from '@/widgets/header'
</script>
