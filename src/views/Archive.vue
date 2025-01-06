<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n'
import { marked } from 'marked';

const { locale } = useI18n()
const route = useRoute();
const slug = route.params.slug;
console.log(locale.value)

const module = ref(null);
const content = ref('null');

const markdownFiles = import.meta.glob(`@/archive/**/*.md`, { as: 'raw' });

const loadMarkdown = async () => {
  const filePath = `/src/archive/${locale.value}/${slug}.md`;

  if (filePath in markdownFiles) {
    module.value = await markdownFiles[filePath]() // Load the file dynamically
  } else {
    module.value = null;
  }
  
  if (module.value !== null) {
    content.value = marked(module.value);
  }
};

onMounted(() => {
    loadMarkdown();
})
</script>

<template>
    <div v-html="content"></div>
</template>