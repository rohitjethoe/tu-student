<script setup>
import { ref, onMounted } from "vue"
import { useAuthStore } from '@/stores/authStore.js'

const authStore = useAuthStore()
const menuOpened = ref(false)

const pages = [
    { title: 'account.details', path: '/account/details' },
    { title: 'account.thoughts', path: '/account/thoughts' }
]

const logout = async () => authStore.logout()

onMounted(() => authStore.initialize())
</script>

<template>
    <div v-if="authStore.user" class="fixed w-full top-0 h-0 left-0 z-10">
        <div class="bg-gray-200 text-black dark:bg-black dark:text-white w-full px-4 py-2 text-sm flex justify-between items-center">
            <div @click="menuOpened = !menuOpened" class="toggle select-none hover:cursor-pointer font-medium">
                {{ authStore.user.email }}
            </div>
            <div @click="logout" class="select-none hover:cursor-pointer">
                {{ $t('account.logout.title') }}
            </div>
        </div>
        <div class="transition-all ease-in" :class="menuOpened ? 'opacity-100 pointer-events-all' : 'opacity-0 pointer-events-none'">
            <ul>
                <li class="text-sm px-4 py-2 bg-gray-100 dark:bg-black" v-for="page in pages">
                    <a class="links no-underline" :href="page.path">{{ $t(page.title) }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.toggle::after {
    display: inline-block;
    margin-left: .255em;
    vertical-align: .255em;
    content: "";
    border-top: .3em solid;
    border-right: .3em solid transparent;
    border-bottom: 0;
    border-left: .3em solid transparent;
}

.links {
    color: #fff; 

    @apply transition-all ease-in;

    &:hover {
        @apply text-gray-400;
    }

    @media (prefers-color-scheme: light) {
        color: #242424;

        &:hover {
            color: #000;
        }
    }
}
</style>