<script setup>
import ProductCard from '@/components/ProductCard.vue'

defineProps({
  items: Array
})

const emit = defineEmits(['onAddToFavorite', 'onAddToCart'])

const onAddToCart = (item) => {
  console.log('onAddToCart', item)
}

const onAddToFavorite = (item) => {
  emit('onAddToFavorite', item)
}
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <ProductCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      @onClickAdd="onAddToCart"
      @onClickFavorite="onAddToFavorite"
    />
  </div>
</template>
