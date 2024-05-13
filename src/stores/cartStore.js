import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useItemsStore } from './itemsStore'

export const useCartStore = defineStore('cartStore', () => {
  const cart = ref([])

  const totalPrice = computed(() => {
    return cart.value.reduce((acc, item) => acc + item.price, 0)
  })

  const vatPrice = computed(() => {
    return totalPrice.value * 0.05
  })

  function addToCart(item) {
    cart.value.push(item)
  }

  function removeFromCart(item) {
    cart.value = cart.value.filter((cartItem) => cartItem.id !== item.id)
  }

  function toggleCartItem(item) {
    item.isAdded ? removeFromCart(item) : addToCart(item)
    const itemsStore = useItemsStore()
    itemsStore.toggleAddedToCart(item.id)
  }

  function clearCart() {
    cart.value = []
    const itemsStore = useItemsStore()
    itemsStore.removeAllItemsFromCart()
  }

  return {
    cart,
    totalPrice,
    vatPrice,
    addToCart,
    removeFromCart,
    toggleCartItem,
    clearCart
  }
})
