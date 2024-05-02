<script setup>
import { onMounted, ref, reactive, watch } from 'vue'
import axios from 'axios'

import AppHeader from '@/components/AppHeader.vue'
import CardList from '@/components/CardList.vue'
import AppDrawer from '@/components/AppDrawer.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'

const items = ref([])

const filters = reactive({
  searchQuery: '',
  sortBy: 'title'
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeInput = (event) => {
  filters.searchQuery = event.target.value
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get('https://9e0d0b9b6eb7d8ab.mokky.dev/items', { params })
    items.value = data
  } catch (e) {
    console.error(e.message)
  }
}

onMounted(fetchItems)
watch(filters, fetchItems)
</script>

<template>
  <AppDrawer v-if="false" />

  <div class="w-4/5 m-auto mt-14 bg-white rounded-xl shadow-xl">
    <AppHeader />
    <div class="p-10">
      <div class="flex flex-1 justify-between items-center mb-10">
        <h2 class="mb-8 text-3xl font-bold">Все кроссовки</h2>
        <div class="flex items-center gap-5">
          <BaseSelect @change="onChangeSelect" />
          <BaseInput :value="filters.searchQuery" @input="onChangeInput" />
        </div>
      </div>
      <CardList :items="items" />
    </div>
  </div>
</template>
