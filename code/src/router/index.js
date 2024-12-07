import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView
    },
    {
      path: '/parser',
      name: 'parser',
      component: () => import('@/views/ParserPage.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/TestToolBilancioPage.vue')
    },
  ]
})

export default router
