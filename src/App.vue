<script setup>
import { onMounted, ref, reactive, watch } from 'vue'

import { instance } from '@/api'

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

    const { data } = await instance.get('items', { params })
    items.value = data.map((item) => ({
      ...item,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (e) {
    console.error(e.message)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await instance.get('favorites')
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.productId === item.id)

      if (!favorite) return item

      return { ...item, isFavorite: true, favoriteId: favorite.id }
    })
  } catch (e) {
    console.error(e.message)
  }
}

const addToFavorite = async (item) => {
  try {
    const { id: productId, favoriteId, isFavorite } = item

    if (isFavorite) {
      await instance.delete(`favorites/${favoriteId}`)
      item.favoriteId = null
    } else {
      const { data } = await instance.post('favorites', { productId })
      item.favoriteId = data.id
    }

    item.isFavorite = !isFavorite
  } catch (e) {
    console.error(e.message)
  }
}

onMounted(async () => {
  await fetchItems()
  await fetchFavorites()
})
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
      <CardList :items="items" @onAddToFavorite="addToFavorite" />
    </div>
  </div>
</template>
