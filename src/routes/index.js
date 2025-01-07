import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Archive from '@/views/Archive.vue'
import Substack from '@/views/Substack.vue'
import Error from '@/views/Error.vue'

const routes = [
    { 
        path: '/', 
        name: 'Home',
        component: Home,
    },
    { 
        path: '/substack',
        name: 'Substack', 
        component: Substack 
    },
    { 
        path: '/archive/:slug', 
        name: 'Archive',
        component: Archive 
    },
    { 
        path: '/:pathMatch(.*)*', 
        name: 'Error',
        component: Error 
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router