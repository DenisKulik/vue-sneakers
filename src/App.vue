<script setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

import { instance } from '@/api'

import AppHeader from '@/components/AppHeader.vue'
import CardList from '@/components/CardList.vue'
import AppDrawer from '@/components/AppDrawer.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'

const items = ref([])
const cart = ref([])
const isDrawerOpen = ref(false)

const filters = reactive({
  searchQuery: '',
  sortBy: 'title'
})

const totalPrice = computed(() => {
  return cart.value.reduce((acc, item) => acc + item.price, 0)
})

const vatPrice = computed(() => Math.round(totalPrice.value * 0.05))

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeInput = (event) => {
  filters.searchQuery = event.target.value
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await instance.get('items', { params })
    items.value = data.map((item) => ({
      ...item,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (e) {
    console.error(e.message)
  }
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

const addToCart = (item) => {
  item.isAdded = true
  cart.value.push(item)
}

const removeFromCart = (item) => {
  cart.value = cart.value.filter((cartItem) => cartItem.id !== item.id)
  item.isAdded = false
}

const toggleCartItem = async (item) => {
  item.isAdded ? removeFromCart(item) : addToCart(item)
}

const addToFavorite = async (item) => {
  try {
    const { id: productId, favoriteId, isFavorite } = item

    if (isFavorite) {
      await instance.delete(`favorites/${favoriteId}`)
      item.favoriteId = null
    } else {
      const { data } = await instance.post('favorites', { productId })
      item.favoriteId = data.id
    }

    item.isFavorite = !isFavorite
  } catch (e) {
    console.error(e.message)
  }
}

const openDrawer = () => {
  isDrawerOpen.value = true
}

const closeDrawer = () => {
  isDrawerOpen.value = false
}

onMounted(async () => {
  await fetchItems()
  await fetchFavorites()
})
watch(filters, fetchItems)
</script>

<template>
  <AppDrawer
    v-if="isDrawerOpen"
    :total-price="totalPrice"
    :vat-price="vatPrice"
    :cart="cart"
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
