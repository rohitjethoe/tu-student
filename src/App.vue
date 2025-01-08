<script setup>
import Account from '@/components/Account.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
	<Account />
	<div class="min-h-[100svh] w-11/12 mt-4 sm:w-4/5 mx-auto sm:mt-32 lg:max-w-[740px]">
		<Header />
			<div class="container">
				<router-view>
				</router-view>
			</div>
		<Footer />
	</div>
</template>