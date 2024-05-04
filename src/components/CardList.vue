<script setup>
import ProductCard from '@/components/ProductCard.vue'

defineProps({
  items: Array
})

const onAddProductToCart = () => {
  console.log('onAddProductToCart')
}

const onAddProductToFavorite = () => {
  console.log('onAddProductToFavorite')
}
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <ProductCard
      v-for="item in items"
      :key="item.id"
      :title="item.title"
      :image-url="item.imageUrl"
      :price="item.price"
      :is-favorite="item.isFavorite"
      :is-added="items.isAdded"
      @onClickAdd="onAddProductToCart"
      @onClickFavorite="onAddProductToFavorite"
    />
  </div>
</template>
