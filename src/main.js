import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import Vue3Toasity from 'vue3-toastify'
import router from './router'
import App from './App.vue'
import { toastOptions } from '@/config'
import './style.css'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(autoAnimatePlugin)
app.use(Vue3Toasity, toastOptions)
app.mount('#app')
