<template>
    <div>
        <div class="pt-2">
            <strong>{{ $t('terms.title') }}</strong><br />
            {{ $t('terms.update') }}
        </div>

        <ul class="list-decimal pl-4 pt-1">
            <li>
                <strong> {{ $t('terms.definitions.title') }}</strong>
                <ul class="list-decimal pl-4 pt-1">
                    <li  v-for="item in [0,1,2,3,4]" class="pb-1">
                        <strong>{{ $t(`terms.definitions.list[${item}].by`) }}:</strong>
                        {{ $t(`terms.definitions.list[${item}].textual`) }}
                    </li>
                </ul>
            </li>
            <li>
                <strong> {{ $t('terms.applicability.title') }}</strong>
                <ul class="list-decimal pl-4 pt-1">
                    <li v-for="item in [0, 1]" class="pb-1">
                        {{ $t(`terms.applicability.list[${item}]`) }}
                    </li>
                </ul>
            </li>
            <li>
                <strong> {{ $t('terms.rightOfUse.title') }}</strong>
                <ul class="list-decimal pl-4 pt-1">
                    <li v-for="item in [0,1,2,3]" class="pb-1">
                        {{ $t(`terms.rightOfUse.list[${item}]`) }}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>