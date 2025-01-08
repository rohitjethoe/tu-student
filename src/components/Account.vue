<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from '@/stores/authStore.js';

const authStore = useAuthStore();
const menuOpened = ref(false)

const logout = async () => authStore.logout();

onMounted(() => authStore.initialize());
</script>

<template>
    <div v-if="authStore.user" class="fixed w-full top-0 left-0">
        <div class="bg-black text-white w-full px-4 py-2 text-sm flex justify-between">
            <div @click="menuOpened = !menuOpened" class="toggle select-none hover:cursor-pointer">
                {{ authStore.user.email }}
            </div>
            <div @click="logout" class="select-none hover:cursor-pointer">
                {{ $t('account.logout.title') }}
            </div>
        </div>
        <div class="h-0 bg-[rgba(0,0,0,0)] text-[rgba(255,255,255,0)] px-4 py-2 transition-bg transition-text ease-in" :class="menuOpened ? 'h-full bg-[rgba(0,0,0,0.75)] text-[rgba(255,255,255,1)]' : ''">
            <ul>
                <li>
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