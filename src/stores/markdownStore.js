import { defineStore } from 'pinia';
import { marked } from 'marked';
import katex from 'katex';

const INLINE_MATH_REGEX = /\$([^\$]+)\$/g;
const BLOCK_MATH_REGEX = /\$\$([\s\S]+?)\$\$/g;

/**
 * Markdown Store for rendering and managing Markdown content with KaTeX support.
 * @module useMarkdownStore
 */
export const useMarkdownStore = defineStore('markdown', {
  state: () => ({
    /**
     * The raw Markdown module loaded from the file system.
     * @type {string|null}
     */
    module: null,

    /**
     * The rendered Markdown content.
     * @type {string|null}
     */
    content: null,
  }),

  actions: {
    /**
     * Renders LaTeX using KaTeX.
     * @param {string} latex - The LaTeX string to render.
     * @param {boolean} [displayMode=false] - Whether to render in display mode.
     * @returns {string} The rendered HTML string or the original LaTeX string if rendering fails.
     */
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

    /**
     * Processes text to replace inline and block LaTeX with rendered KaTeX and renders Markdown.
     * @param {string} text - The text to process and render.
     * @returns {string} The rendered HTML content.
     */
    renderTextWithKaTeX(text) {
      let processedText = text.replace(BLOCK_MATH_REGEX, (match, latex) => {
        return `<div class="katex-block">${this.renderKaTeX(latex.trim(), true)}</div>`;
      });
    
      processedText = processedText.replace(INLINE_MATH_REGEX, (match, latex) => {
        return `<span class="katex-inline">${this.renderKaTeX(latex.trim(), false)}</span>`;
      });
    
      return marked(processedText);
    },

    /**
     * Loads a Markdown file and processes its content for KaTeX rendering.
     * @param {string} locale - The locale of the Markdown file.
     * @param {string} slug - The slug identifier of the file.
     * @param {string} type - The type of the file (not used in this function but included for flexibility).
     * @returns {Promise<void>}
     */
    async loadMarkdown(locale, slug, type) {
      const archiveFiles = import.meta.glob('@/archive/**/*.md', { query: '?raw', import: 'default' });
          
      const files = archiveFiles;
      const filePath = `/src/archive/${locale}/${slug}.md`;

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

    /**
     * Sets the page title based on the slug and locale.
     * @param {string} slug - The slug identifier for the page.
     * @param {string} locale - The locale for the page.
     */
    setPageTitle(slug, locale) {
      window.document.title = `${slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())} | ${locale === "en" ? 'www' : locale}.tustudent.blog`;
    }
  }
});