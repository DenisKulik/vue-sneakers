<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useCartStore } from '@/stores/cartStore'
import { useOrdersStore } from '@/stores/ordersStore'

import CartItem from '@/components/CartItem.vue'
import InfoBlock from '@/components/InfoBlock.vue'

const emit = defineEmits(['close'])

const cartStore = useCartStore()
const { cart, totalPrice, vatPrice } = storeToRefs(cartStore)
const { toggleCartItem } = cartStore

const ordersStore = useOrdersStore()
const { isLoading, orderId } = storeToRefs(ordersStore)
const { createOrder } = ordersStore

const infoBlock = computed(() => {
  return orderId.value
    ? {
        title: 'Заказ оформлен!',
        imageUrl: 'order-success-icon.png',
        description: `Ваш заказ #${orderId.value} скоро будет передан курьерской доставке`
      }
    : {
        title: 'Корзина пустая',
        imageUrl: 'package-icon.png',
        description: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
      }
})
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-slate-900 opacity-50 z-10"></div>
  <div class="flex flex-col fixed top-0 right-0 w-96 h-full p-8 bg-white z-20">
    <button class="flex items-center gap-5 mb-7">
      <img
        src="/arrow-next-black.svg"
        alt="Close"
        class="cursor-pointer rotate-180 opacity-30 hover:opacity-100 hover:-translate-x-1 transition"
        @click="emit('close')"
      />
      <h2 class="text-2xl font-bold">Корзина</h2>
    </button>

    <div v-if="!cart.length" class="h-full flex">
      <InfoBlock
        :title="infoBlock.title"
        :image-url="infoBlock.imageUrl"
        :description="infoBlock.description"
      />
    </div>

    <div class="flex flex-1 flex-col gap-4" v-auto-animate>
      <CartItem
        v-for="item in cart"
        :key="item.id"
        :item="item"
        @on-remove="toggleCartItem(item)"
      />
    </div>

    <div v-if="cart.length" class="flex flex-col gap-4 my-5">
      <div class="flex justify-between gap-2">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ totalPrice }} ₽</b>
      </div>

      <div class="flex justify-between gap-2">
        <span>Налог 5%:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ vatPrice }} ₽</b>
      </div>

      <button
        class="flex justify-center items-center gap-5 w-full mt-4 py-3 text-white bg-lime-500 rounded-xl hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-300 transition"
        :disabled="!cart.length || isLoading"
        @click.stop="createOrder"
      >
        {{ isLoading ? 'Загрузка...' : 'Оформить заказ' }}
        <img src="/arrow-next.svg" alt="Checkout" class="ml-3" />
      </button>
    </div>
  </div>
</template>
