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
        path: '/substack',
        name: 'Substack', 
        component: () => import('@/views/Substack.vue')
    },
    { 
        path: '/archive/:slug', 
        name: 'Archive',
        component: () => import('@/views/Archive.vue')
    },
    { 
        path: '/login',
        name: 'Login', 
        component: () => import('@/views/Login.vue')
    },
    { 
        path: '/terms',
        name: 'Terms', 
        component: () => import('@/views/Terms.vue')
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