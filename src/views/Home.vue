<script setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const { locale } = useI18n();

const host = window.location.host;
const filter = ref("");

const basic = [{
	slug: 'what-is-a-function',
	tags: [
		{
			title: 'pre-university calculus',
			color: 'text-purple-400'
		}
	]
}]

const archives = ref(basic)
const filtered = ref([]);

const filterArchives = () => {
	archives.value.forEach(archive => {

		archive.tags.forEach(tag => {
			console.log(filter.value);
			if (tag.title === filter.value) {
				console.log(true);

				filtered.value.push(archive);
			}

			// console.log(filtered.value);
			// archives.value = filtered.value;
		})
	})
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
						<option value=""></option>
						<option v-for="tag in archives.flatMap(archive => archive.tags.map(tag => tag.title))" :value="tag">{{ tag }}</option>
					</select>
				</div>
				<div v-for="archive in archives">
					<a :href="'/archive/' + archive.slug">
						/archive/{{ archive.slug }}
					</a> —
					<span v-for="tag in archive.tags" :class="tag.color">{{ tag.title }}</span>
				</div>
			</div>
		</div>
		<Footer />
	</div>
</template>