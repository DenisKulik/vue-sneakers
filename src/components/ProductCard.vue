<script setup>
defineProps({
  title: String,
  imageUrl: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean
})
</script>

<template>
  <div
    class="relative p-8 cursor-pointer bg-white border border-slate-100 rounded-3xl hover:-translate-y-2 hover:shadow-xl transition"
  >
    <img
      class="absolute top-8 left-8"
      :src="isFavorite ? '/vue-sneakers/like-2.svg' : '/vue-sneakers/like-1.svg'"
      alt="Like"
      @click.stop="$emit('onClickFavorite')"
    />

    <img :src="imageUrl" alt="Sneaker" />
    <p class="mt-2">{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена:</span>
        <b>{{ price }} руб.</b>
      </div>
      <img
        :src="isAdded ? '/vue-sneakers/checked.svg' : '/vue-sneakers/plus.svg'"
        alt="Add to cart"
        @click.stop="$emit('onClickAdd')"
      />
    </div>
  </div>
</template>
