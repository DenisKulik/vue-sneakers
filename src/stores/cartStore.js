import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useItemsStore } from './itemsStore'

export const useCartStore = defineStore('cartStore', () => {
  const cart = ref([])

  const itemsStore = useItemsStore()

  const cartInLocalStorage = localStorage.getItem('cart')
  cart.value = cartInLocalStorage ? JSON.parse(cartInLocalStorage) : []

  const totalPrice = computed(() => {
    return cart.value.reduce((acc, item) => acc + item.price, 0)
  })

  const vatPrice = computed(() => {
    return Math.round(totalPrice.value * 0.05)
  })

  function addToCart(item) {
    cart.value.push(item)
  }

  function removeFromCart(item) {
    cart.value = cart.value.filter((cartItem) => cartItem.id !== item.id)
  }

  function toggleCartItem(item) {
    item.isAdded ? removeFromCart(item) : addToCart(item)
    itemsStore.toggleAddedToCart(item.id)
  }

  function clearCart() {
    cart.value = []
    itemsStore.removeAllItemsFromCart()
  }

  watch(
    () => cart.value,
    (state) => {
      localStorage.setItem('cart', JSON.stringify(state))
    },
    { deep: true }
  )

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
