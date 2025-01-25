import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { 
        path: '/', 
        name: 'Home',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue')
    },
    { 
        path: '/terms',
        name: 'Terms', 
        component: () => import('@/views/Terms.vue')
    },
    { 
        path: '/login',
        name: 'Login', 
        component: () => import('@/views/Login.vue')
    },
    { 
        path: '/account/details',
        name: 'Details', 
        component: () => import('@/views/Details.vue')
    },
    { 
        path: '/account/thoughts',
        name: 'Thoughts', 
        component: () => import('@/views/Thoughts.vue')
    },
    { 
        path: '/archive/:slug', 
        name: 'Archive',
        component: () => import('@/views/Archive.vue')
    },
    {
        path: '/exams/:slug',
        name: 'Exams',
        component: () => import('@/views/Exams.vue')
    },
    { 
        path: '/:pathMatch(.*)*', 
        name: 'Error',
        component: () => import('@/views/Error.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router