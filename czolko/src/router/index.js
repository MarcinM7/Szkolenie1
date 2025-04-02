import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', component: HomeView },
  {
    path: '/game/:category',
    component: () => import('../views/GameView.vue')
  },
  {
    path: '/result',
    component: () => import('../views/ResultView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router