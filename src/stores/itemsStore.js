import { defineStore } from 'pinia'
import { instance } from '@/api'

export const useItemsStore = defineStore('itemsStore', {
  state: () => ({
    items: []
  }),

  actions: {
    toggleAddedToCart(itemId) {
      const itemIdx = this.items.findIndex((item) => item.id === itemId)
      this.items[itemIdx].isAdded = !this.items[itemIdx].isAdded
    },
    toggleFavoriteItem(itemId, favoriteId) {
      const itemIdx = this.items.findIndex((item) => item.id === itemId)
      this.items[itemIdx].isFavorite = !this.items[itemIdx].isFavorite
      this.items[itemIdx].favoriteId = favoriteId
    },
    removeAllItemsFromCart() {
      this.items = this.items.map((item) => ({ ...item, isAdded: false }))
    },
    async fetchItems({ searchQuery, sortBy }) {
      try {
        const params = { sortBy }

        if (searchQuery) {
          params.title = `*${searchQuery}*`
        }

        const { data } = await instance.get('items', { params })
        this.items = data.map((item) => ({
          ...item,
          isFavorite: false,
          favoriteId: null,
          isAdded: false
        }))
      } catch (e) {
        console.error(e.message)
      }
    }
  }
})
