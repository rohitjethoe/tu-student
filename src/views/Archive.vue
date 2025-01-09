<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { marked } from 'marked';
import { useAuthStore } from '@/stores/authStore.js';
import katex from 'katex';

const { locale } = useI18n();
const route = useRoute();
const slug = route.params.slug;
const markdownFiles = import.meta.glob(`@/archive/**/*.md`, { query: '?raw', import: 'default' });
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
  const filePath = `/src/archive/${locale.value}/${slug}.md`;
  
  if (filePath in markdownFiles) {
    module.value = await markdownFiles[filePath]();
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
  loadMarkdown();
  window.document.title = `${slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())} | ${locale.value === "en" ? 'www' : locale.value}.tustudent.blog`;
});
</script>

<template>
  <div>
    <div class="flex gap-3 pt-4">
      <div class="button text-sm py-1.5 px-3 rounded-md cursor-pointer transition-all ease-in">💭 {{ $t('archive.thought') }}</div>
    </div>
    <div class="pb-4 mt-3 italic">
      /archive/{{ locale }}/{{ slug }}.md
    </div>
    <div class="tu-markdown" v-html="content"></div>
  </div>
</template>

<style lang="scss">
// Note: removed 'scoped' to allow KaTeX styles to work properly
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

.katex-block {
  overflow-x: auto;
  overflow-y: hidden;
  padding: 1em 0;
}

.katex-inline {
  padding: 0 0.2em;
}
</style>