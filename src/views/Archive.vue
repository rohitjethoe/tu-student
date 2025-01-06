<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { marked } from 'marked';
import katex from 'katex';  // Importing KaTeX
import 'katex/dist/katex.min.css';  // Importing KaTeX CSS

const { locale } = useI18n();
const route = useRoute();
const slug = route.params.slug;

const module = ref(null);
const content = ref('null');

// Import all markdown files
const markdownFiles = import.meta.glob(`@/archive/**/*.md`, { as: 'raw' });

// Function to render markdown and handle LaTeX expressions
const loadMarkdown = async () => {
  const filePath = `/src/archive/${locale.value}/${slug}.md`;

  if (filePath in markdownFiles) {
    module.value = await markdownFiles[filePath](); // Load the markdown file dynamically
  } else {
    module.value = null;
  }

  if (module.value !== null) {
    // Step 1: Render Markdown content using marked
    let renderedMarkdown = marked(module.value);

    // Step 2: Process Inline LaTeX (e.g., \( ... \)) using regex
    renderedMarkdown = renderedMarkdown.replace(/\\\((.*?)\\\)/g, (match, latex) => {
      try {
        return katex.renderToString(latex, { displayMode: false }); // Render inline math
      } catch (error) {
        console.error("Error rendering inline LaTeX:", error);
        return match; // Fallback to original if error occurs
      }
    });

    // Step 3: Process Block LaTeX (e.g., $$ ... $$) using regex
    renderedMarkdown = renderedMarkdown.replace(/\$\$(.*?)\$\$/g, (match, latex) => {
      try {
        return `<div class="katex-block">${katex.renderToString(latex, { displayMode: true })}</div>`; // Render block math
      } catch (error) {
        console.error("Error rendering block LaTeX:", error);
        return match; // Fallback to original if error occurs
      }
    });

    // Step 4: Update the content to render the final result
    content.value = renderedMarkdown;
  }
};

// Load markdown on component mount
onMounted(() => {
  loadMarkdown();
});
</script>

<template>
  <div v-html="content"></div>
</template>
