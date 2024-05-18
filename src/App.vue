<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useCartStore } from '@/stores/cartStore'
import { useOrdersStore } from '@/stores/ordersStore'

import AppDrawer from '@/components/AppDrawer.vue'
import AppHeader from '@/components/AppHeader.vue'
import HomeView from '@/views/HomeView.vue'

const cartStore = useCartStore()
const { cart, totalPrice, vatPrice } = storeToRefs(cartStore)
const { toggleCartItem } = cartStore

const ordersStore = useOrdersStore()
const { isLoading } = storeToRefs(ordersStore)
const { createOrder } = ordersStore

const isDrawerOpen = ref(false)

const openDrawer = () => {
  isDrawerOpen.value = true
}

const closeDrawer = () => {
  isDrawerOpen.value = false
}
</script>

<template>
  <AppDrawer
    v-if="isDrawerOpen"
    :total-price="totalPrice"
    :vat-price="vatPrice"
    :cart="cart"
    :is-loading="isLoading"
    @create-order="createOrder"
    @close="closeDrawer"
    @remove-item="toggleCartItem"
  />
  <div class="w-4/5 m-auto mt-14 bg-white rounded-xl shadow-xl">
    <AppHeader :total-price="totalPrice" @open-drawer="openDrawer" />
    <div class="p-10">
      <HomeView />
    </div>
  </div>
</template>
