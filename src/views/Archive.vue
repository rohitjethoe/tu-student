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

const markdownFiles = import.meta.glob(`@/archive/**/*.md`, { query: '?raw', import: 'default' });
const module = ref(null);
const content = ref('null');

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
  window.document.title = `${slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())} | ${locale.value === "en" ? 'www' : locale.value}.tustudent.blog`;
});
</script>

<template>
  <div>
    <div class="pb-4 mt-3 italic">
      /archive/{{ locale }}/{{ slug }}.md
    </div>
    <div class="tu-markdown" v-html="content"></div>
  </div>
</template>