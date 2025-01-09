<template>
    <div>
        <div class="pt-2 pb-4">
            <strong>{{ $t('terms.title') }}</strong><br />
            {{ $t('terms.update') }}
        </div>

        <ul class="list-decimal pl-6 pt-1">
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

            <li>
                <strong> {{ $t('terms.availability.title') }}</strong>
                <ul class="list-decimal pl-4 pt-1">
                    <li v-for="item in [0,1,]" class="pb-1">
                        {{ $t(`terms.availability.list[${item}]`) }}
                    </li>
                </ul>
            </li>
            
            <li>
                <strong> {{ $t('terms.payment.title') }}</strong>
                <ul class="list-decimal pl-4 pt-1">
                    <li v-for="item in [0,1]" class="pb-1">
                        {{ $t(`terms.payment.list[${item}]`) }}
                    </li>
                </ul>
            </li>

            <li>
                <strong> {{ $t('terms.liability.title') }}</strong>
                <ul class="list-decimal pl-4 pt-1">
                    <li v-for="item in [0,1]" class="pb-1">
                        {{ $t(`terms.liability.list[${item}]`) }}
                    </li>
                </ul>
            </li>

            <li>
                <strong> {{ $t('terms.duration.title') }}</strong>
                <ul class="list-decimal pl-4 pt-1">
                    <li v-for="item in [0,1,2]" class="pb-1">
                        {{ $t(`terms.duration.list[${item}]`) }}
                    </li>
                </ul>
            </li>

            <li>
                <strong> {{ $t('terms.force.title') }}</strong>
                <ul class="list-decimal pl-4 pt-1">
                    <li v-for="item in [0]" class="pb-1">
                        {{ $t(`terms.force.list[${item}]`) }}
                    </li>
                </ul>
            </li>

            <li>
                <strong> {{ $t('terms.law.title') }}</strong>
                <ul class="list-decimal pl-4 pt-1">
                    <li v-for="item in [0, 1]" class="pb-1">
                        {{ $t(`terms.law.list[${item}]`) }}
                    </li>
                </ul>
            </li>
        </ul>
        
        <p>{{ $t('terms.continue') }}</p>
    </div>
</template>