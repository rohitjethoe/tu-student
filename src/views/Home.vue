<script setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import en from '@/locale/en.js';
import nl from '@/locale/nl.js';

const { locale } = useI18n();
const filter = ref("");
const archives = { 
	en: en.archive.posts,
	nl: nl.archive.posts 
}

onMounted(() => {
	const windowLocale = locale.value === "en" ? 'www' : locale.value;
	window.document.title = `${windowLocale}.tustudent.blog`;
})
</script>

<template>
	<div>
		<div class="py-3">
			<p class="text-red-400 font-bold italic">
				{{ $t('home.update') }}
			</p>
		</div>
		<div class="pb-3">
			<p>
				{{ $t('home.biography.main') }}
				<br><br>
				<i>
					{{ $t('home.translated') }}
				</i>
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
				<p class="text-sm">
					filter: 
				</p>
				<select 
					v-model="filter" 
					@input="filterArchives" 
					class="text-sm"
				>
					<option value="">
						{{ $t('home.archive.filter') }}
					</option>
					<option 
						v-for="archive in archives[locale]" 
						:value="archive.filter"
					>
						{{ archive.filter }}
					</option>
				</select>
			</div>
			<div class="flex flex-wrap gap-4 items-center" v-for="archive in archives[locale]">
				<div class="pb-8" v-if="filter !== '' ? archive.filter === filter : true">
					<div class="text-xs font-bold" v-html="archive.title">
					</div>
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