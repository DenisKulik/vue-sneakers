import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

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
      setTimeout(() => (orderId.value = null), 3000)
      toast.success('Ваш заказ успешно оформлен!')
    } catch (e) {
      toast.error(`Error: ${e.message}`)
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
