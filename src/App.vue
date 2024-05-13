<script setup>
import { onMounted, ref, reactive, watch } from 'vue'

import { instance } from '@/api'

import { useItemsStore } from '@/stores/itemsStore'
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'

import AppHeader from '@/components/AppHeader.vue'
import CardList from '@/components/CardList.vue'
import AppDrawer from '@/components/AppDrawer.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'

const itemsStore = useItemsStore()
const { items } = storeToRefs(itemsStore)
const { toggleFavoriteItem, fetchItems } = itemsStore

const cartStore = useCartStore()
const { cart, totalPrice, vatPrice } = storeToRefs(cartStore)
const { toggleCartItem, clearCart } = cartStore

const isDrawerOpen = ref(false)
const isLoading = ref(false)

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

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await instance.get('favorites')
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.productId === item.id)

      if (!favorite) return item

      return { ...item, isFavorite: true, favoriteId: favorite.id }
    })
  } catch (e) {
    console.error(e.message)
  }
}

const addToFavorite = async (item) => {
  try {
    const { id: productId, favoriteId, isFavorite } = item

    if (isFavorite) {
      await instance.delete(`favorites/${favoriteId}`)
      toggleFavoriteItem(item.id, null)
    } else {
      const { data } = await instance.post('favorites', { productId })
      toggleFavoriteItem(item.id, data.id)
    }
  } catch (e) {
    console.error(e.message)
  }
}

const createOrder = async () => {
  try {
    isLoading.value = true
    await instance.post('orders', {
      items: cart.value,
      total: totalPrice.value
    })
    clearCart()
  } catch (e) {
    console.error(e.message)
  } finally {
    isLoading.value = false
  }
}

const getCartFromLocalStorage = () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []
  items.value = items.value.map((item) => {
    const cartItem = cart.value.find((cartItem) => cartItem.id === item.id)
    return cartItem ? { ...item, isAdded: true } : item
  })
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
  getCartFromLocalStorage()
}

onMounted(updateItems)

watch(filters, updateItems)
watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)
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
