<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

import AppHeader from '@/components/AppHeader.vue'
import CardList from '@/components/CardList.vue'
import AppDrawer from '@/components/AppDrawer.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'

const items = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get('https://9e0d0b9b6eb7d8ab.mokky.dev/items')
    items.value = data
  } catch (e) {
    console.error(e.message)
  }
})
</script>

<template>
  <AppDrawer v-if="false" />

  <div class="w-4/5 m-auto mt-14 bg-white rounded-xl shadow-xl">
    <AppHeader />
    <div class="p-10">
      <div class="flex flex-1 justify-between items-center mb-10">
        <h2 class="mb-8 text-3xl font-bold">Все кроссовки</h2>
        <div class="flex items-center gap-5">
          <BaseSelect />
          <BaseInput />
        </div>
      </div>
      <CardList :items="items" />
    </div>
  </div>
</template>
