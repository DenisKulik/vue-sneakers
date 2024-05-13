import { defineStore } from 'pinia'
import { ref } from 'vue'

import { instance } from '@/api'

import { useCartStore } from './cartStore'

export const useItemsStore = defineStore('itemsStore', () => {
  const items = ref([])

  const cartStore = useCartStore()

  const toggleAddedToCart = (itemId) => {
    const itemIdx = items.value.findIndex((item) => item.id === itemId)
    items.value[itemIdx].isAdded = !items.value[itemIdx].isAdded
  }

  const updateAddedToCart = () => {
    items.value = items.value.map((item) => {
      const cartItem = cartStore.cart.find((cartItem) => cartItem.id === item.id)
      return cartItem ? { ...item, isAdded: true } : item
    })
  }

  const toggleFavoriteItem = (itemId, favoriteId) => {
    const itemIdx = items.value.findIndex((item) => item.id === itemId)
    items.value[itemIdx].isFavorite = !items.value[itemIdx].isFavorite
    items.value[itemIdx].favoriteId = favoriteId
  }

  const removeAllItemsFromCart = () => {
    items.value = items.value.map((item) => ({ ...item, isAdded: false }))
  }

  const fetchItems = async ({ searchQuery, sortBy }) => {
    try {
      const params = { sortBy }

      if (searchQuery) {
        params.title = `*${searchQuery}*`
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

  return {
    items,
    toggleAddedToCart,
    updateAddedToCart,
    toggleFavoriteItem,
    removeAllItemsFromCart,
    fetchItems
  }
})
