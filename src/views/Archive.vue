<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { marked } from 'marked';
import { useAuthStore } from '@/stores/authStore.js';
import { useAccountStore } from '@/stores/accountStore.js';
import katex from 'katex';

const authStore = useAuthStore();
const accountStore = useAccountStore();

const { locale } = useI18n();
const route = useRoute();
const slug = route.params.slug;

const thoughtBoxIsVisible = ref(false);

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

  setTimeout(() => {
    accountStore.getThoughts(slug);
  }, 500)
});
</script>

<template>
  <div>
    <div v-if="authStore.user" class="flex gap-3 pt-4 relative">
      <div @click="thoughtBoxIsVisible = !thoughtBoxIsVisible" class="button text-sm py-1.5 px-3 rounded-md cursor-pointer transition-all ease-in">
        💭 {{ $t('archive.thought') }}
      </div>
      <div :class="thoughtBoxIsVisible ? 'opacity-100 pointer-events-all' : 'opacity-0 pointer-events-none'" class="absolute top-2.5 left-0 flex items-center justify-between bg-gray-200 dark:bg-[#1b1b1b] w-full py-2 sm:py-4 px-3 sm:px-6 rounded transition-all ease-in">
        <div class="flex items-center gap-1.5 sm:gap-3">
          <div>
            ✨
          </div>
          <input 
            class="bg-gray-200 text-black dark:bg-[#1b1b1b] dark:text-white text-xs p-1.5 focus:outline-none" 
            :placeholder="$t('archive.placeholder')" 
            type="text"
            v-model="accountStore.thought.value"
          >
        </div>
        <div class="flex items-center">
          <div @click="accountStore.addThought(slug)" class="bg-blue-600 text-white dark:text-black text-xs py-1 sm:py-1.5 px-2 sm:px-4 transition-all ease-in hover:bg-blue-700 cursor-pointer rounded">
            {{ $t('archive.submit') }}
          </div>
          <div @click="thoughtBoxIsVisible = !thoughtBoxIsVisible" class="text-xs py-1.5 px-4 transition-all ease-in hover:text-orange-800 cursor-pointer rounded">
            {{ $t('archive.cancel') }} 🔥
          </div>
        </div>
      </div>
    </div>
    
    <div class="pb-4 mt-3 italic">
      /archive/{{ locale }}/{{ slug }}.md
    </div>
    <div class="tu-markdown" v-html="content"></div>
  </div>
</template>

<style lang="scss">
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