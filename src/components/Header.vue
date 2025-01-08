<script setup>
import { onMounted, ref } from 'vue';

const loginIsVisible = ref(true);

onMounted(() => {
   if (window.location.pathname === "/login") {
        loginIsVisible.value = false;
   }
});
</script>

<template>
    <div class="pb-3 border-b-2 border-b-dark dark:border-b-light flex justify-between items-center">
        <a class="text-dark dark:text-white no-underline hover:text-dark dark:hover:text-white hover:opacity-80" href="/">
            <h1 class="text-3xl font-bold italic">{{ $t('title')}}</h1>
        </a>
        <a v-if="loginIsVisible" href="/login">{{ $t('login.title') }}</a>
    </div>
</template>