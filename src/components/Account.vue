<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from '@/stores/authStore.js';

const authStore = useAuthStore();
const menuOpened = ref(false)

const logout = async () => authStore.logout();

onMounted(() => authStore.initialize());
</script>

<template>
    <div v-if="authStore.user" class="fixed w-full top-0 left-0 z-10">
        <div class="bg-gray-200 text-black dark:bg-black dark:text-white w-full px-4 py-2 text-sm flex justify-between items-center">
            <div @click="menuOpened = !menuOpened" class="toggle select-none hover:cursor-pointer font-medium">
                {{ authStore.user.email }}
            </div>
            <div @click="logout" class="select-none hover:cursor-pointer">
                {{ $t('account.logout.title') }}
            </div>
        </div>
        <div class="h-0 px-4 py-2 transition-bg transition-text ease-in" :class="menuOpened ? 'h-full bg-gray-100 text-black/100 dark:bg-black/75 dark:text-white/100' : 'bg-gray-100/0 text-black/0 dark:bg-black/0 dark:text-white/0'">
            <ul>
                <li class="text-sm">
                    {{ $t('account.details') }}
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
</style>