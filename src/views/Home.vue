<script setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import en from '@/locale/en.js';
import nl from '@/locale/nl.js';

const { locale } = useI18n();

const filter = ref("");
const archives = { en: en.archive.posts, nl: nl.archive.posts }

onMounted(() => {
	window.document.title = `home | ${locale.value === "en" ? 'www' : locale.value}.tustudent.blog`;
})
</script>

<template>
	<div>
		<div class="py-3">
			<p class="text-red-400 font-bold italic">{{ $t('home.update') }}</p>
		</div>
		<div class="pb-3">
			<p>
				{{ $t('home.biography.main') }} <br><br>{{ $t('home.biography.references.textual') }} <a href="https://en.wikipedia.org/wiki/Computer_science" target="_blank">{{ $t('home.biography.references.computerscience') }}</a>? {{ $t('home.biography.references.textual2') }} {{ $t('home.biography.references.computerscience') }} {{ $t('home.biography.references.textual3') }} <a href="https://en.wikipedia.org/wiki/Computation" target="_blank">{{ $t('home.biography.references.computation') }}</a>, <a href="https://en.wikipedia.org/wiki/Information" target="_blank">{{ $t('home.biography.references.information') }}</a> {{ $t('home.biography.references.textual4') }} <a href="https://en.wikipedia.org/wiki/Automation" target="_blank">{{ $t('home.biography.references.automation') }}</a>.<br><br><i>{{ $t('home.translated') }}</i>
			</p>
			<ul class="list-disc pl-4">
				<li>
					<a href="https://www.tustudent.blog">English</a>
				</li>
				<li>
					<a href="https://nl.tustudent.blog">Nederlands</a> (Dutch)
				</li>
			</ul>
		</div>
		<div class="py-3">
			<h2 class="text-lg font-bold italic">
				{{ $t('home.archive.title') }}
			</h2>
		</div>
		<div>
			<div class="flex gap-2 pb-6">
				<p>filter: </p>
				<select v-model="filter" @input="filterArchives">
					<option value="">{{ $t('home.archive.filter') }}</option>
					<option v-for="archive in archives[locale]" :value="archive.title">{{ archive.title }}</option>
				</select>
			</div>
			<div class="flex flex-wrap gap-4 items-center" v-for="archive in archives[locale]">
				<div class="pb-8 pt-4" v-if="filter !== '' ? archive.title === filter : true">
					<div class="p-3 pt-1.5 pb-2 px-4 border rounded-full inline font-medium" :class="archive.style">{{ archive.title }}</div> 
					<div class="mt-4">
						<div v-for="post in archive.posts" class="py-2">
							<a :href="`/archive/${post.slug}`">{{ post.title }}</a>
							— 
							<span class="italic">
								{{ (locale === "nl") ? $t(`home.archive.days[${new Date(post.date).getDate()}]`) : '' }} {{ $t(`home.archive.months[${new Date(post.date).getMonth()}]`) }} {{ locale === "en" ? $t(`home.archive.days[${new Date(post.date).getDate()}]`) : '' }} {{ new Date(post.date).getFullYear() }}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>