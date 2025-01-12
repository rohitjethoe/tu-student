/**
 * @typedef {Object} Highlight
 * @property {string} id - Unique identifier for the highlight
 * @property {string} userId - User ID who created the highlight
 * @property {string} text - Highlighted text content
 * @property {Object} range - Position of the highlight in the text
 * @property {number} range.startOffset - Starting position
 * @property {number} range.endOffset - Ending position
 */

import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useHighlightManager = defineStore('highlightManager', () => {
  const selectedRange = ref(null);
  const selectedText = ref('');
  const highlightBoxVisible = ref(false);
  const markdownContent = ref(null);

  /**
   * Captures text selection for highlighting
   * @param {HTMLElement} content - Markdown content element
   */
  const captureHighlight = (content) => {
    const selection = window.getSelection();
    if (!selection.toString() || !content) return;

    const range = selection.getRangeAt(0);
    if (!content.contains(range.commonAncestorContainer)) return;

    selectedText.value = selection.toString();
    selectedRange.value = {
      startOffset: getTextOffset(content, range.startContainer, range.startOffset),
      endOffset: getTextOffset(content, range.endContainer, range.endOffset)
    };
    highlightBoxVisible.value = true;
  };

  /**
   * Calculates text offset position
   * @param {Node} root - Root DOM node
   * @param {Node} node - Target node
   * @param {number} offset - Character offset
   * @returns {number} Total text offset
   */
  const getTextOffset = (root, node, offset) => {
    const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let count = 0;
    
    while (walk.nextNode()) {
      if (walk.currentNode === node) {
        return count + offset;
      }
      count += walk.currentNode.length;
    }
    return count;
  };

  /**
   * Applies highlights to the document
   * @param {HTMLElement} content - Markdown content element
   * @param {Highlight[]} highlights - Array of highlights to apply
   */
  const applyHighlights = (content, highlights) => {
    if (!content) return;

    // Remove existing highlights
    const existingHighlights = content.querySelectorAll('.highlight');
    existingHighlights.forEach(el => {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
    });

    // Apply new highlights
    highlights.forEach(highlight => {
      const walk = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
      let count = 0;
      let startContainer, endContainer;
      let startOffset, endOffset;

      while (walk.nextNode()) {
        const node = walk.currentNode;
        const length = node.length;

        if (!startContainer && count + length > highlight.range.startOffset) {
          startContainer = node;
          startOffset = highlight.range.startOffset - count;
        }

        if (!endContainer && count + length > highlight.range.endOffset) {
          endContainer = node;
          endOffset = highlight.range.endOffset - count;
          break;
        }

        count += length;
      }

      if (startContainer && endContainer) {
        const range = document.createRange();
        range.setStart(startContainer, startOffset);
        range.setEnd(endContainer, endOffset);
        
        const span = document.createElement('span');
        span.className = 'highlight';
        span.title = 'Double-click to remove';
        span.dataset.highlightId = highlight.id;
        
        try {
          range.surroundContents(span);
        } catch (error) {
          console.error('Error applying highlight:', error);
        }
      }
    });
  };

  const resetSelection = () => {
    selectedText.value = '';
    selectedRange.value = null;
    highlightBoxVisible.value = false;
  };

  return {
    selectedRange,
    selectedText,
    highlightBoxVisible,
    markdownContent,
    captureHighlight,
    applyHighlights,
    resetSelection
  };
});