<script setup>
defineProps({
  totalPrice: Number
})

const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header class="flex justify-between p-8 border-b border-slate-200">
    <div class="flex items-center gap-4">
      <img src="/logo.png" alt="Logo" />
      <div>
        <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
        <p class="text-slate-400">Магазин лучших кроссовок</p>
      </div>
    </div>

    <nav class="flex items-center">
      <ul class="flex items-center gap-10">
        <li
          class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black"
          @click.stop="emit('openDrawer')"
        >
          <img src="/cart.svg" alt="Cart" />
          <b>{{ totalPrice }} ₽</b>
        </li>
        <li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
          <img src="/heart.svg" alt="Cart" />
          <span>Закладки</span>
        </li>
        <li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
          <img src="/profile.svg" alt="Cart" />
          <span>Профиль</span>
        </li>
      </ul>
    </nav>
  </header>
</template>
