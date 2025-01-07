<template>
    <div class="flex justify-between pt-3">
        <div>
            <p>
                🙂 <i>{{ $t('login.meta.ifAccount.title') }}</i>: 
            </p>
            <ul class="list-disc pl-4">
                <li>{{ $t('login.meta.ifAccount.details.emojis') }}</li>
                <li>{{ $t('login.meta.ifAccount.details.exercises') }}</li>
                <li>{{ $t('login.meta.ifAccount.details.waitingTime') }}</li>
            </ul>
        </div>
        <div>
            <p>
                🙁 <i>{{ $t('login.meta.ifNoAccount.title') }}</i>: <strong></strong>
            </p>
            <ul class="list-disc pl-4">
                <li>{{ $t('login.meta.ifNoAccount.details.emojis') }}</li>
                <li>{{ $t('login.meta.ifNoAccount.details.exercises') }}</li>
                <li>{{ $t('login.meta.ifNoAccount.details.waitingTime') }}</li>
            </ul>
        </div>
    </div>
</template>