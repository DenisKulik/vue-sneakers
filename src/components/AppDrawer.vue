<script setup>
import CartItem from '@/components/CartItem.vue'
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-slate-900 opacity-50 z-10"></div>
  <div class="fixed top-0 right-0 w-96 h-full p-8 bg-white z-20">
    <div class="flex items-center gap-5 mb-7">
      <img
        src="/arrow-next-black.svg"
        alt="Close"
        class="cursor-pointer rotate-180 opacity-30 hover:opacity-100 hover:-translate-x-1 transition"
        @click="$emit('close')"
      />
      <h2 class="text-2xl font-bold">Корзина</h2>
    </div>
    <div class="flex flex-1 flex-col gap-4">
      <CartItem
        title="Мужские Кроссовки Nike Blazer Mid Suede"
        imageUrl="sneakers/sneakers-1.jpg"
        :price="12999"
      />
    </div>
    <div class="flex flex-col gap-4 my-5">
      <div class="flex justify-between gap-2">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>12990 ₽</b>
      </div>

      <div class="flex justify-between gap-2">
        <span>Налог 5%:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>500 ₽</b>
      </div>

      <button
        class="flex justify-center items-center gap-5 w-full mt-4 py-3 text-white bg-lime-500 rounded-xl hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-300 transition"
      >
        Оформить заказ
        <img src="/arrow-next.svg" alt="Checkout" class="ml-3" />
      </button>
    </div>
  </div>
</template>