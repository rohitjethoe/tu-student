<script setup>
import { onMounted, ref } from 'vue';

const footerIsVisible = ref(true);

onMounted(() => {
   if (window.location.pathname === "/login") {
        footerIsVisible.value = false;
   }
});
</script>

<template>
    <div v-if="footerIsVisible" class="footer pt-12 pb-4 text-xs flex justify-between">
        <a href="/about">{{ $t('about')}} tustudent.blog</a>
        <a class="lowercase" href="/terms">{{ $t('terms.title')}}</a>
    </div>
</template>