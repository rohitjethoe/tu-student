// stores/markdownStore.js
import { defineStore } from 'pinia';
import { marked } from 'marked';
import katex from 'katex';

const INLINE_MATH_REGEX = /\$([^\$]+)\$/g;
const BLOCK_MATH_REGEX = /\$\$([\s\S]+?)\$\$/g;

export const useMarkdownStore = defineStore('markdown', {
  state: () => ({
    content: null,
    module: null,
  }),

  actions: {
    renderKaTeX(latex, displayMode = false) {
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
    },

    async loadMarkdown(locale, slug, type) {
      // Define both glob patterns statically
      const archiveFiles = import.meta.glob('@/archive/**/*.md', { query: '?raw', import: 'default' });
      // const exerciseFiles = import.meta.glob('@/exercises/**/*.md', { query: '?raw', import: 'default' });
      
      // Choose the correct files based on type
      
      const files = type === 'archive' ? archiveFiles : exerciseFiles;
      const filePath = `/src/${type}/${locale}/${slug}.md`;

      if (filePath in files) {
        this.module = await files[filePath]();
      } else {
        this.module = null;
        this.content = null;
        return;
      }

      if (this.module !== null) {
        let processedContent = this.module.replace(BLOCK_MATH_REGEX, (match, latex) => {
          return `<div class="katex-block">${this.renderKaTeX(latex.trim(), true)}</div>`;
        });
        
        processedContent = processedContent.replace(INLINE_MATH_REGEX, (match, latex) => {
          return `<span class="katex-inline">${this.renderKaTeX(latex.trim(), false)}</span>`;
        });
        
        this.content = marked(processedContent);
      }
    },

    setPageTitle(slug, locale) {
      window.document.title = `${slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())} | ${locale === "en" ? 'www' : locale}.tustudent.blog`;
    }
  }
});