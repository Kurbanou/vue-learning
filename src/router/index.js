import { createRouter, createWebHistory } from 'vue-router'
import AppLesson from '@/components/AppLesson.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppLesson, // показывать твой урок на главной
    },
  ],
})

export default router
