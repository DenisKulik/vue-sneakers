<script setup>
import ProductCard from '@/components/ProductCard.vue'

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
      title="Мужские Кроссовки Nike Blazer Mid Suede"
      image-url="/vue-sneakers/sneakers/sneakers-1.jpg"
      :price="12999"
      :is-favorite="true"
      :is-added="true"
      @onClickAdd="onAddProductToCart"
      @onClickFavorite="onAddProductToFavorite"
    />
  </div>
</template>
