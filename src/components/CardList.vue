<script setup>
import ProductCard from '@/components/ProductCard.vue'

defineProps({
  items: Array
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <ProductCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      @on-click-add="emit('addToCart', item)"
      @on-click-favorite="emit('addToFavorite', item)"
    />
  </div>
</template>
