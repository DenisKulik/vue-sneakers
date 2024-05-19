<script setup>
const emit = defineEmits(['onPrev'])
</script>

<template>
  <button class="flex items-center">
    <img
      src="/arrow-next-black.svg"
      alt="previous"
      class="cursor-pointer rotate-180 opacity-30 hover:opacity-100 hover:-translate-x-1 transition"
      @click.stop="emit('onPrev')"
    />
  </button>
</template>
