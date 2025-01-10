<script setup>
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
</script>

<template>
    <div>
        <h2 class="py-2">{{ $t('about.heading') }}</h2>
        <p class="font-bold">{{ $t('about.madeBy') }} &copy; {{ new Date().getFullYear() }}</p>
        <p class="py-2">{{ $t('about.builtWith') }}</p>
        <h2><strong>Privacybeleid</strong></h2>
        <p>{{ $t('about.privacy[0]') }} <a :href="`https://policies.google.com/privacy?hl=${locale}`">{{ $t('about.privacy[1]') }}</a> {{ $t('about.privacy[2]') }} <a href="https://tools.google.com/dlpage/gaoptout">Google Analytics Opt-out Browser Add-on</a> {{ $t('about.privacy[3]') }}<br><br>{{ $t('about.privacy[4]') }}</p>
    </div>
</template>