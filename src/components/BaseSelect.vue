<template>
  <select class="py-2 px-3 border rounded-md outline-none" @change="$emit('change', $event)">
    <option value="name">По названию</option>
    <option value="price">По возрастанию цены</option>
    <option value="-price">По убыванию цены</option>
  </select>
</template>
