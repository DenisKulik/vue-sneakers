<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useFavoritesStore } from '@/stores/favoritesStore'
import { useItemsStore } from '@/stores/itemsStore'
import { useCartStore } from '@/stores/cartStore'

import PageTitle from '@/components/PageTitle.vue'
import ButtonPrev from '@/components/ButtonPrev.vue'
import CardList from '@/components/CardList.vue'

const favoritesStore = useFavoritesStore()
const { fetchFavorites, addToFavorite } = favoritesStore

const itemsStore = useItemsStore()
const { items } = storeToRefs(itemsStore)
const { updateAddedToCart } = itemsStore

const cartStore = useCartStore()
const { toggleCartItem } = cartStore

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const updateFavorites = async () => {
  await fetchFavorites(true)
  updateAddedToCart()
}

onMounted(updateFavorites)
</script>

<template>
  <div class="flex flex-1 items-center gap-5 mt-1 mb-10">
    <ButtonPrev @on-prev="goBack" />
    <PageTitle title="Мои закладки" />
  </div>
  <CardList
    v-if="items.length"
    :items="items"
    @add-to-favorite="addToFavorite"
    @add-to-cart="toggleCartItem"
  />
  <div v-else class="text-center text-gray-400">Закладок не найдено</div>
</template>
