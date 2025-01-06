import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Archive from '@/views/Archive.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/archive/:slug', component: Archive }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router