<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useFavoritesStore } from '@/stores/favoritesStore'
import { useItemsStore } from '@/stores/itemsStore'
import { useCartStore } from '@/stores/cartStore'

import CardList from '@/components/CardList.vue'

const favoritesStore = useFavoritesStore()
const { fetchFavorites, addToFavorite } = favoritesStore

const itemsStore = useItemsStore()
const { items } = storeToRefs(itemsStore)
const { updateAddedToCart } = itemsStore

const cartStore = useCartStore()
const { toggleCartItem } = cartStore

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const updateItems = async () => {
  await fetchFavorites(true)
  updateAddedToCart()
}

onMounted(updateItems)
</script>

<template>
  <div class="flex flex-1 justify-between items-center mb-8">
    <button class="flex items-center gap-5 mb-7">
      <img
        src="/arrow-next-black.svg"
        alt="Close"
        class="cursor-pointer rotate-180 opacity-30 hover:opacity-100 hover:-translate-x-1 transition"
        @click="goBack"
      />
      <h2 class="text-3xl font-bold">Мои закладки</h2>
    </button>
  </div>
  <div>
    <CardList
      v-if="items.length"
      :items="items"
      @add-to-favorite="addToFavorite"
      @add-to-cart="toggleCartItem"
    />
    <div v-else class="text-center text-gray-400">Закладок не найдено</div>
  </div>
</template>
