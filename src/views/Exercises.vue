<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const type = computed(() => {
  const path = route.path;
  if (path.startsWith('/archive/')) return 'archive';
  if (path.startsWith('/exercises/')) return 'exercises';
  throw new Error('Invalid route path');
});

const { locale } = useI18n();
const route = useRoute();
const slug = route.params.slug;
const markdownStore = useMarkdownStore();

onMounted(() => {
  markdownStore.setPageTitle(slug, locale.value);
  markdownStore.loadMarkdown(locale.value, slug, type.value);
});
</script>

<template>
  <div>
    <div class="pb-4 mt-3 italic">
      /exercises/{{ slug }}.md
    </div>
    <div class="tu-markdown" v-html="content"></div>
  </div>
</template>