import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

import { instance } from '@/api'
import { useItemsStore } from './itemsStore'

export const useFavoritesStore = defineStore('favoritesStore', () => {
  const favorites = ref([])

  const itemsStore = useItemsStore()

  const fetchFavorites = async (isFavoriteView = false) => {
    try {
      const { data } = await instance.get('favorites?_relations=items')
      favorites.value = data
      isFavoriteView ? itemsStore.setItemsFromFavorites() : itemsStore.updateFavorites()
    } catch (e) {
      toast.error(`Error: ${e.message}`)
      console.error(e.message)
    }
  }

  const addToFavorite = async (item) => {
    try {
      const { id: item_id, favoriteId, isFavorite } = item

      if (isFavorite) {
        await instance.delete(`favorites/${favoriteId}`)
        itemsStore.toggleFavoriteItem(item.id, null)
      } else {
        const { data } = await instance.post('favorites', { item_id })
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
