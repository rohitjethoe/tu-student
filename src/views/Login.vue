<script setup>
import { watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const router = useRouter();

watch(
  () => authStore.user,
  (user) => {
    if (user) {
      router.push({ name: "Home" });
    }
  },
  { immediate: true }
);
</script>

<template>
    <div class="pt-3 flex flex-col items-center gap-3">
        <button @click="authStore.googleSignIn" class="flex items-center gap-3 outline-none bg-dark dark:bg-light py-3 px-12 rounded w-full justify-center opacity-100 transition-all ease-in hover:bg-dark/95">
            <img class="w-3 h-3" src="@/assets/google-icon.png" alt="">
            <span class="text-white dark:text-[#242424] text-sm font-medium">
                {{ $t('account.login.button') }} Google
            </span>
        </button>
        <button @click="authStore.githubSignIn" class="flex items-center gap-3 outline-none bg-dark dark:bg-light py-3 px-12 rounded w-full justify-center opacity-100 transition-all ease-in hover:bg-dark/95">
            <img class="hidden dark:block w-3 h-3" src="@/assets/github-icon.svg" alt="">
            <img class="block dark:hidden w-3 h-3" src="@/assets/github-iconLight.svg" alt="">
            <span class="text-white dark:text-[#242424] text-sm font-medium">
                {{ $t('account.login.button') }} Github
            </span>
        </button>
        <a class="text-sm text-dark dark:text-light" href="/about">{{ $t('about.title') }} tustudent.blog</a>
    </div>
</template>