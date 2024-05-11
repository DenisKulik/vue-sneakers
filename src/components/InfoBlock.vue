<script setup>
defineProps({
  title: String,
  imageUrl: String,
  description: String
})
</script>

<template>
  <div class="max-w-[288px] flex flex-col justify-center items-center mx-auto text-center">
    <img class="mb-4" height="120" width="120" :src="`/vue-sneakers/${imageUrl}`" alt="info" />
    <h2 class="mb-1 text-2xl font-medium">{{ title }}</h2>
    <p class="text-gray-400">{{ description }}</p>
  </div>
</template>
