<script setup>
import { onMounted, ref, reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useItemsStore } from '@/stores/itemsStore'
import { useCartStore } from '@/stores/cartStore'
import { useFavoritesStore } from '@/stores/favoritesStore'
import { useOrdersStore } from '@/stores/ordersStore'

import AppHeader from '@/components/AppHeader.vue'
import CardList from '@/components/CardList.vue'
import AppDrawer from '@/components/AppDrawer.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'

const itemsStore = useItemsStore()
const { items } = storeToRefs(itemsStore)
const { updateAddedToCart, fetchItems } = itemsStore

const cartStore = useCartStore()
const { cart, totalPrice, vatPrice } = storeToRefs(cartStore)
const { toggleCartItem } = cartStore

const favoritesStore = useFavoritesStore()
const { fetchFavorites, addToFavorite } = favoritesStore

const ordersStore = useOrdersStore()
const { isLoading } = storeToRefs(ordersStore)
const { createOrder } = ordersStore

const isDrawerOpen = ref(false)

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

const openDrawer = () => {
  isDrawerOpen.value = true
}

const closeDrawer = () => {
  isDrawerOpen.value = false
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
  <AppDrawer
    v-if="isDrawerOpen"
    :total-price="totalPrice"
    :vat-price="vatPrice"
    :cart="cart"
    :is-loading="isLoading"
    @create-order="createOrder"
    @close="closeDrawer"
    @remove-item="toggleCartItem"
  />
  <div class="w-4/5 m-auto mt-14 bg-white rounded-xl shadow-xl">
    <AppHeader :total-price="totalPrice" @open-drawer="openDrawer" />
    <div class="p-10">
      <div class="flex flex-1 justify-between items-center mb-10">
        <h2 class="mb-8 text-3xl font-bold">Все кроссовки</h2>
        <div class="flex items-center gap-5">
          <BaseSelect @change="onChangeSelect" />
          <BaseInput :value="filters.searchQuery" @input="onChangeInput" />
        </div>
      </div>
      <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="toggleCartItem" />
    </div>
  </div>
</template>
