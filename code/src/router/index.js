import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  base: "/assistente-conto-scout/",
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
    },
  ]
})

export default router
