<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useCartStore } from '@/stores/cartStore'
import { useOrdersStore } from '@/stores/ordersStore'

import BaseButton from '@/components/BaseButton.vue'
import ButtonPrev from '@/components/ButtonPrev.vue'
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
    <div class="flex items-center gap-5 mb-7">
      <ButtonPrev @on-prev="emit('close')" />
      <h2 class="text-2xl font-bold">Корзина</h2>
    </div>

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

      <div class="flex justify-between gap-2 mb-4">
        <span>Налог 5%:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ vatPrice }} ₽</b>
      </div>

      <BaseButton
        :title="isLoading ? 'Загрузка...' : 'Оформить заказ'"
        :disabled="isLoading"
        @on-click="createOrder"
      />
    </div>
  </div>
</template>
