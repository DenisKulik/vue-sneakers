import { defineStore } from 'pinia'
import { ref } from 'vue'

import { instance } from '@/api'
import { useCartStore } from './cartStore'

export const useOrdersStore = defineStore('ordersStore', () => {
  const isLoading = ref(false)

  const cartStore = useCartStore()

  const createOrder = async () => {
    try {
      isLoading.value = true
      await instance.post('orders', {
        items: cartStore.cart.value,
        total: cartStore.totalPrice.value
      })
      cartStore.clearCart()
    } catch (e) {
      console.error(e.message)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    createOrder
  }
})
