<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { marked } from 'marked';
import katex from 'katex'; 
import 'katex/dist/katex.min.css'; 

const { locale } = useI18n();
const route = useRoute();
const slug = route.params.slug;

const module = ref(null);
const content = ref('null');

const markdownFiles = import.meta.glob(`@/archive/**/*.md`, { as: 'raw' });

const loadMarkdown = async () => {
  const filePath = `/src/archive/${locale.value}/${slug}.md`;

  if (filePath in markdownFiles) {
    module.value = await markdownFiles[filePath](); 
  } else {
    module.value = null;
  }

  if (module.value !== null) {
    let renderedMarkdown = marked(module.value);

    renderedMarkdown = renderedMarkdown.replace(/\\\((.*?)\\\)/g, (match, latex) => {
      try {
        return katex.renderToString(latex, { displayMode: false }); 
      } catch (error) {
        console.error("Error rendering inline LaTeX:", error);
        return match;
      }
    });

    renderedMarkdown = renderedMarkdown.replace(/\$\$(.*?)\$\$/g, (match, latex) => {
      try {
        return `<div class="katex-block">${katex.renderToString(latex, { displayMode: true })}</div>`; // Render block math
      } catch (error) {
        console.error("Error rendering block LaTeX:", error);
        return match;
      }
    });

    content.value = renderedMarkdown;
  }
};

onMounted(() => {
  loadMarkdown();
});
</script>

<template>
  <div class="w-11/12 mt-4 sm:w-4/5 mx-auto sm:mt-32">
    <div class="pb-3 border-b-2 border-b-dark dark:border-b-light mb-3">
      <h1 class="text-3xl font-bold italic">{{ $t('title')}}</h1>
    </div>
    <div class="pb-4 italic">
      /archive/en/{{ slug }}.md
    </div>
    <div class="tu-markdown" v-html="content"></div>
  </div>
</template>