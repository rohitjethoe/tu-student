import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Archive from '@/views/Archive.vue'
import Substack from '@/views/Substack.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/substack', component: Substack },
    { path: '/archive/:slug', component: Archive }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router