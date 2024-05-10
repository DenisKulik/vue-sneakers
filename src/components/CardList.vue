<script setup>
import ProductCard from '@/components/ProductCard.vue'

defineProps({
  items: Array
})

const emit = defineEmits(['addToFavorite', 'addToCart'])

const onAddToCart = (item) => {
  emit('addToCart', item)
}

const onAddToFavorite = (item) => {
  emit('addToFavorite', item)
}
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <ProductCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      @on-click-add="onAddToCart"
      @on-click-favorite="onAddToFavorite"
    />
  </div>
</template>
