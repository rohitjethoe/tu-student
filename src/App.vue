<script setup>
import Account from '@/components/Account.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
	<div class="min-h-[100svh] w-11/12 mt-4 sm:w-4/5 mx-auto sm:mt-12 lg:max-w-[740px]">
		<Account />
		<Header />
			<div class="container">
				<router-view>
				</router-view>
			</div>
		<Footer />
	</div>
</template>