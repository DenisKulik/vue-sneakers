import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'

import { instance } from '@/api'
import { useCartStore } from './cartStore'

export const useOrdersStore = defineStore('ordersStore', () => {
  const isLoading = ref(false)
  const orderId = ref(null)

  const cartStore = useCartStore()
  const { cart, totalPrice, vatPrice } = storeToRefs(cartStore)

  const createOrder = async () => {
    try {
      isLoading.value = true
      const { data } = await instance.post('orders', {
        items: cart.value,
        total: totalPrice.value,
        vat: vatPrice.value
      })
      orderId.value = data.id
      cartStore.clearCart()
      setTimeout(() => (orderId.value = null), 5000)
    } catch (e) {
      console.error(e.message)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    orderId,
    createOrder
  }
})
