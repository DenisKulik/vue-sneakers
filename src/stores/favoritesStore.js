import { defineStore } from 'pinia'
import { ref } from 'vue'

import { instance } from '@/api'
import { useItemsStore } from './itemsStore'

export const useFavoritesStore = defineStore('favoritesStore', () => {
  const favorites = ref([])

  const itemsStore = useItemsStore()

  const fetchFavorites = async () => {
    try {
      const { data } = await instance.get('favorites')
      favorites.value = data
      itemsStore.updateFavorites()
    } catch (e) {
      console.error(e.message)
    }
  }

  const addToFavorite = async (item) => {
    try {
      const { id: productId, favoriteId, isFavorite } = item

      if (isFavorite) {
        await instance.delete(`favorites/${favoriteId}`)
        itemsStore.toggleFavoriteItem(item.id, null)
      } else {
        const { data } = await instance.post('favorites', { productId })
        itemsStore.toggleFavoriteItem(item.id, data.id)
      }
    } catch (e) {
      console.error(e.message)
    }
  }

  return {
    favorites,
    fetchFavorites,
    addToFavorite
  }
})
