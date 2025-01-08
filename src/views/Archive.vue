<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { marked } from 'marked';
import { useAuthStore } from '@/stores/authStore.js';
import katex from 'katex'; 
import 'katex/dist/katex.min.css'; 

const authStore = useAuthStore();

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
    <div class="flex gap-3 pt-4">
      <div class="button text-sm py-1.5 px-3 rounded-md cursor-pointer transition-all ease-in">💭 Add thought</div>
    </div>
    <div class="pb-4 mt-3 italic">
      /archive/{{ locale }}/{{ slug }}.md
    </div>
    <div class="tu-markdown" v-html="content"></div>
  </div>
</template>

<style lang="scss" scoped> 
.button {
  @apply bg-gray-100;
  &:hover {
    @apply bg-gray-200;
  }
  @media (prefers-color-scheme: dark) {
    background-color: rgba(#000, 0.25);
    &:hover {
      background-color: rgba(#000, 0.75);
    }
  }
}
</style>