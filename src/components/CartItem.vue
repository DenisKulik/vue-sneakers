<script setup>
defineProps({
  title: String,
  imageUrl: String,
  price: Number
})
</script>

<template>
  <div class="flex gap-5 p-4 border border-slate-100 rounded-xl">
    <img class="w-16 h-16 object-contain" :src="`/vue-sneakers/${imageUrl}`" alt="Sneaker" />
    <div class="flex gap-2 justify-between items-start">
      <div>
        <p class="mb-2">{{ title }}</p>
        <b>{{ price }} ₽</b>
      </div>
      <img
        class="cursor-pointer opacity-50 hover:opacity-100 transition"
        src="/close.svg"
        alt="Remove"
        @click.stop="$emit('onClickRemove')"
      />
    </div>
  </div>
</template>
