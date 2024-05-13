import { defineStore } from 'pinia'
import { useItemsStore } from './itemsStore'

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cart: []
  }),

  getters: {
    totalPrice(state) {
      return state.cart.reduce((acc, item) => acc + item.price, 0)
    },
    vatPrice() {
      return this.totalPrice * 0.05
    }
  },

  actions: {
    addToCart(item) {
      this.cart.push(item)
    },
    removeFromCart(item) {
      this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id)
    },
    toggleCartItem(item) {
      item.isAdded ? this.removeFromCart(item) : this.addToCart(item)
      const items = useItemsStore()
      items.toggleAddedToCart(item.id)
    },
    clearCart() {
      this.cart = []
      const items = useItemsStore()
      items.removeAllItemsFromCart()
    }
  }
})
