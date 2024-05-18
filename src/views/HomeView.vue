<script setup>
import { onMounted, reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useItemsStore } from '@/stores/itemsStore'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useCartStore } from '@/stores/cartStore'

import CardList from '@/components/CardList.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'

const itemsStore = useItemsStore()
const { items } = storeToRefs(itemsStore)
const { updateAddedToCart, fetchItems } = itemsStore

const favoritesStore = useFavoritesStore()
const { fetchFavorites, addToFavorite } = favoritesStore

const cartStore = useCartStore()
const { toggleCartItem } = cartStore

const filters = reactive({
  searchQuery: '',
  sortBy: 'title'
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeInput = (event) => {
  filters.searchQuery = event.target.value
}

const updateItems = async () => {
  await fetchItems(filters)
  await fetchFavorites()
  updateAddedToCart()
}

onMounted(updateItems)

watch(filters, updateItems)
</script>

<template>
  <div class="flex flex-1 justify-between items-center mb-10">
    <h2 class="mb-8 text-3xl font-bold">Все кроссовки</h2>
    <div class="flex items-center gap-5">
      <BaseSelect @change="onChangeSelect" />
      <BaseInput :value="filters.searchQuery" @input="onChangeInput" />
    </div>
  </div>
  <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="toggleCartItem" />
</template>
