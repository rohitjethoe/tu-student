<template>
    <div class="py-4 flex flex-col gap-4 text-left">
        <div class="flex flex-col gap-1 text-dark dark:text-light">
            <span class="text-sm font-bold">404 {{ $t('error.error') }}</span> 
            <span class="text-xs">{{ $t('error.title') }}</span>
        </div>
        <a class="text-xs" href="/">{{ $t('error.return')}}</a>.
    </div>
</template>