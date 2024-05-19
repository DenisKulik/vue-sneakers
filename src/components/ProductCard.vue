<script setup>
defineProps({
  item: Object
})

const emit = defineEmits(['onClickFavorite', 'onClickAdd'])
</script>

<template>
  <div
    class="flex flex-col relative p-8 cursor-pointer bg-white border border-slate-100 rounded-3xl hover:-translate-y-2 hover:shadow-xl transition"
  >
    <button @click.stop="emit('onClickFavorite', item)">
      <img
        class="absolute top-8 left-8"
        :src="item.isFavorite ? '/vue-sneakers/like-2.svg' : '/vue-sneakers/like-1.svg'"
        alt="Like"
      />
    </button>

    <img :src="`/vue-sneakers/${item.imageUrl}`" alt="Sneaker" />
    <p class="flex-1 mt-2">{{ item.title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена:</span>
        <b>{{ item.price }} ₽</b>
      </div>
      <button @click.stop="emit('onClickAdd', item)">
        <img
          :src="item.isAdded ? '/vue-sneakers/checked.svg' : '/vue-sneakers/plus.svg'"
          alt="Add to cart"
        />
      </button>
    </div>
  </div>
</template>
