<script setup>
defineProps({ value: String })
</script>

<template>
  <div class="relative">
    <img class="absolute top-3 left-3" src="/search.svg" alt="Search" />
    <input
      :value="value"
      class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
      placeholder="Поиск"
      @input="$emit('input', $event)"
    />
  </div>
</template>
