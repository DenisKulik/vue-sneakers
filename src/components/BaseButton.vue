<script setup>
defineProps({
  title: String,
  disabled: Boolean
})

const emit = defineEmits(['onClick'])
</script>

<template>
  <button
    class="flex justify-center items-center gap-3 w-full py-3 text-white bg-lime-500 rounded-xl hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-300 transition"
    :disabled="disabled"
    @click.stop="emit('onClick')"
  >
    {{ title }}
    <img src="/arrow-next.svg" alt="Checkout" class="ml-3" />
  </button>
</template>
