<script setup>
import { onMounted, ref } from 'vue';
import { auth } from '@/js/firebase';
import { onAuthStateChanged } from "firebase/auth";

const user = ref(null);

const loginIsVisible = ref(true);

onMounted(() => {
    onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser;
        if (currentUser) {
            loginIsVisible.value = false;
        } else {
            loginIsVisible.value = true;
        }
    });
    
    if (window.location.pathname === "/login") {
        loginIsVisible.value = false;
    }
});
</script>

<template>
    <div class="pb-3 border-b-2 border-b-dark dark:border-b-light flex justify-between items-center" :class="loginIsVisible ? '' : 'pt-8'">
        <a class="text-dark dark:text-white no-underline hover:text-dark dark:hover:text-white hover:opacity-80" href="/">
            <h1 class="text-3xl font-bold italic">{{ $t('appName')}}</h1>
        </a>
        <a v-if="loginIsVisible" href="/login">{{ $t('account.login.title') }}</a>
    </div>
</template>