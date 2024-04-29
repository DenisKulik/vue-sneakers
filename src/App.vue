<script setup>
import AppHeader from '@/components/AppHeader.vue'
import CardList from './components/CardList.vue'
</script>

<template>
  <div class="w-4/5 m-auto mt-14 bg-white rounded-xl shadow-xl">
    <AppHeader />
    <div class="p-10">
      <h2 class="mb-8 text-3xl font-bold">Все кроссовки</h2>
      <CardList />
    </div>
  </div>
</template>

<style scoped></style>
