<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const { locale } = useI18n();
const route = useRoute();
const slug = route.params.slug;
const archivedFiles = import.meta.glob(`@/exercises/**/*.md`, { query: '?raw', import: 'default' });
const module = ref(null);
const content = ref('null');
const INLINE_MATH_REGEX = /\$([^\$]+)\$/g;
const BLOCK_MATH_REGEX = /\$\$([\s\S]+?)\$\$/g;

const renderKaTeX = (latex, displayMode = false) => {
  try {
    return katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      strict: false
    });
  } catch (error) {
    console.error(`Error rendering ${displayMode ? 'block' : 'inline'} LaTeX:`, error);
    return latex;
  }
};

const loadMarkdown = async () => {
  const filePath = `/src/exercises/${locale.value}/${slug}.md`;
  if (filePath in archivedFiles) {
    module.value = await archivedFiles[filePath]();
  } else {
    module.value = null;
    return;
  }

  if (module.value !== null) {
    let processedContent = module.value.replace(BLOCK_MATH_REGEX, (match, latex) => {
      return `<div class="katex-block">${renderKaTeX(latex.trim(), true)}</div>`;
    });
    processedContent = processedContent.replace(INLINE_MATH_REGEX, (match, latex) => {
      return `<span class="katex-inline">${renderKaTeX(latex.trim(), false)}</span>`;
    });
    content.value = marked(processedContent);
  }
};

onMounted(() => {
  window.document.title = `${slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())} | ${locale.value === "en" ? 'www' : locale.value}.tustudent.blog`;
  loadMarkdown();
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