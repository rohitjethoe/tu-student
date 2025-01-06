<script setup>
</script>

<template>
    <div>
        <div class="w-11/12 mt-4 sm:w-4/5 mx-auto sm:mt-32">
            <div class="pb-3 border-b-2 border-b-dark dark:border-b-light">
                <h1 class="text-3xl font-bold italic">{{ $t('title')}}</h1>
            </div>
            <div class="py-3">
                <p class="text-red-400 font-bold italic">{{ $t('update') }}</p>
            </div>
            <div class="pb-3">
                <p>
                    {{ $t('biography.main') }} <br><br>{{ $t('biography.references.textual') }} <a href="https://en.wikipedia.org/wiki/Computer_science" target="_blank">{{ $t('biography.references.computerscience') }}</a>? {{ $t('biography.references.textual2') }} {{ $t('biography.references.computerscience') }} {{ $t('biography.references.textual3') }} <a href="https://en.wikipedia.org/wiki/Computation" target="_blank">{{ $t('biography.references.computation') }}</a>, <a href="https://en.wikipedia.org/wiki/Information" target="_blank">{{ $t('biography.references.information') }}</a> {{ $t('biography.references.textual4') }} <a href="https://en.wikipedia.org/wiki/Automation" target="_blank">{{ $t('biography.references.automation') }}</a>. 
                    <br><br>
                    <i>{{ $t('translated') }}</i>
                    <ul class="list-disc pl-4">
                        <li ><a href="https://nl.{app}.com">Nederlands</a> (Dutch)</li>
                    </ul>
                </p>
            </div>
            <div class="py-3">
                <h2 class="text-lg font-bold italic">
                    {{ $t('archive') }}
                </h2>
            </div>
            <div>
                <p>
                    
                </p>
            </div>
        </div>
    </div>
</template>