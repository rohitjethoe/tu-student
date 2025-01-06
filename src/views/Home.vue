<script setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const { locale } = useI18n();

const filter = ref("");

const archives = [
	{
		title: "pre-university calculus",
		style: "text-purple-400 border-purple-400 bg-purple-400/10",
		posts: [
			{
				title: "What Is Mathematical Modeling?",
				date: "2025-01-06T20:53:04.188Z",
				slug: "what-is-mathematical-modeling"
			}
		]
	}
]

const months = {
	en: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
	nl: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']
}

const days = {
	en: ['0', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st'],
	nl: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
}

onMounted(() => {
	window.document.title = `home | ${locale.value === "en" ? 'www' : locale.value}.tustudent.blog`;
})
</script>

<template>
	<div>
		<div class="min-h-[100svh] w-11/12 mt-4 sm:w-4/5 mx-auto sm:mt-32 lg:max-w-[740px]">
			<Header />
			<div class="py-3">
				<p class="text-red-400 font-bold italic">{{ $t('update') }}</p>
			</div>
			<div class="pb-3">
				<p>
					{{ $t('biography.main') }} <br><br>{{ $t('biography.references.textual') }} <a href="https://en.wikipedia.org/wiki/Computer_science" target="_blank">{{ $t('biography.references.computerscience') }}</a>? {{ $t('biography.references.textual2') }} {{ $t('biography.references.computerscience') }} {{ $t('biography.references.textual3') }} <a href="https://en.wikipedia.org/wiki/Computation" target="_blank">{{ $t('biography.references.computation') }}</a>, <a href="https://en.wikipedia.org/wiki/Information" target="_blank">{{ $t('biography.references.information') }}</a> {{ $t('biography.references.textual4') }} <a href="https://en.wikipedia.org/wiki/Automation" target="_blank">{{ $t('biography.references.automation') }}</a>.<br><br><i>{{ $t('translated') }}</i>
					<ul class="list-disc pl-4">
						<li>
							<a href="https://www.tustudent.blog">English</a>
						</li>
						<li>
							<a href="https://nl.tustudent.blog">Nederlands</a> (Dutch)
						</li>
					</ul>
				</p>
			</div>
			<div class="py-3">
				<h2 class="text-lg font-bold italic">
					{{ $t('archive') }}
				</h2>
			</div>
			<div>
				<div class="flex gap-2 pb-4">
					<p>filter by tag: </p>
					<select v-model="filter" @input="filterArchives">
						<option value="">all</option>
						<option v-for="archive in archives" :value="archive.title">{{ archive.title }}</option>
					</select>
				</div>
				<div class="flex flex-wrap gap-4 items-center" v-for="archive in archives">
					<div v-if="filter !== '' ? archive.title === filter : true">
						<div class="p-3 pt-1.5 pb-2 px-4 border rounded-full inline" :class="archive.style">{{ archive.title }}</div> 
						<div v-for="post in archive.posts" class="py-6">
							<a :href="`/archive/${post.slug}`">{{ post.title }}</a>
							— 
							<span class="italic">
								{{ months[locale][new Date(post.date).getMonth()] }} {{ days[locale][new Date(post.date).getDate()] }} {{ new Date(post.date).getFullYear() }}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Footer />
	</div>
</template>