<script setup>
defineProps({
  item: Object
})

const emit = defineEmits(['onRemove'])
</script>

<template>
  <div class="flex gap-5 p-4 border border-slate-100 rounded-xl">
    <img class="w-16 h-16 object-contain" :src="`/vue-sneakers/${item.imageUrl}`" alt="Sneaker" />
    <div class="flex gap-2 justify-between items-start">
      <div>
        <p class="mb-2">{{ item.title }}</p>
        <b>{{ item.price }} ₽</b>
      </div>
      <button
        class="cursor-pointer opacity-50 hover:opacity-100 transition"
        @click.stop="emit('onRemove', item)"
      >
        <img src="/close.svg" alt="Remove" />
      </button>
    </div>
  </div>
</template>
