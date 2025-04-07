
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const routes = [
  { path: '/', component: HomeView },

  {
  path: '/game',
  component: () => import('../views/GameView.vue'),
},
 
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

