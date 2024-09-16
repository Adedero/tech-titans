import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from) => {
        if (localStorage.getItem('user')) {
          return '/completed'
        }
        /* return '/submission-closed' */
      }
    },
    {
      path: '/submission-closed',
      component: () => import('@/views/NoSubmission.vue'),
    },
    {
      path: '/completed',
      component: () => import('@/views/CompletedView.vue'),
      beforeEnter: (to, from) => {
        if (!localStorage.getItem('user')) {
          return '/'
        }
        /* return '/submission-closed' */
      }
    },
    {
      path: '/edit-response',
      component: () => import('@/views/EditView.vue'),
      beforeEnter: (to, from) => {
        if (!localStorage.getItem('user')) {
          return '/'
        }
        /* return '/submission-closed' */
      }
    },
    {
      path: '/admin',
      component: () => import('@/views/AdminView.vue'),
      beforeEnter: (to, from) => {
        if (!localStorage.getItem('isAuthenticated')) return '/'
      }
    },
    {
      path: '/generate-profile/:id',
      name: 'generate-profile',
      component: () => import('@/views/PosterView.vue'),
      beforeEnter: (to, from) => {
        if (!localStorage.getItem('isAuthenticated')) return '/'
      }
    }
  ]
})


export default router
