<script setup>
import { ref } from 'vue'

import AppDrawer from '@/components/AppDrawer.vue'
import AppHeader from '@/components/AppHeader.vue'

const isDrawerOpen = ref(false)

const openDrawer = () => {
  isDrawerOpen.value = true
}

const closeDrawer = () => {
  isDrawerOpen.value = false
}
</script>

<template>
  <AppDrawer v-if="isDrawerOpen" @close="closeDrawer" />
  <div class="w-4/5 m-auto mt-14 bg-white rounded-xl shadow-xl">
    <AppHeader @open-drawer="openDrawer" />
    <div class="p-10">
      <RouterView />
    </div>
  </div>
</template>
