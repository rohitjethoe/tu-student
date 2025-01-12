<script setup>
import { onMounted, ref, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/authStore.js';
import { useAccountStore } from '@/stores/accountStore.js';
import { useMarkdownStore } from '@/stores/markdownStore.js';
import { useHighlightStore } from '@/stores/highlightStore.js';
import { db } from '@/js/firebase.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

const hasExercises = ref(false);
const markdownContent = ref(null);
const highlightBoxVisible = ref(false);
const selectedRange = ref(null);
const selectedText = ref('');

const { locale } = useI18n();
const route = useRoute();
const slug = route.params.slug;

const markdownStore = useMarkdownStore();
const authStore = useAuthStore();
const accountStore = useAccountStore();
const highlightStore = useHighlightStore();

const thoughtBoxIsVisible = ref(false);
const thoughtsOpened = ref(false);

const addThought = async () => {
  await accountStore.addThought(slug);
  await accountStore.getThoughts(slug);
  thoughtBoxIsVisible.value = false;
};

const checkForExercises = async () => {
  try {
    const exercisesCollection = collection(db, 'exercises'); 
    const exercisesQuery = query(exercisesCollection, where('slug', '==', slug));
    const querySnapshot = await getDocs(exercisesQuery);
    hasExercises.value = !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking exercises:', error);
  }
};

const captureHighlight = () => {
  const selection = window.getSelection();
  if (!selection.toString() || !markdownContent.value) return;

  const range = selection.getRangeAt(0);
  if (!markdownContent.value.contains(range.commonAncestorContainer)) return;

  selectedText.value = selection.toString();
  selectedRange.value = {
    startOffset: getTextOffset(markdownContent.value, range.startContainer, range.startOffset),
    endOffset: getTextOffset(markdownContent.value, range.endContainer, range.endOffset)
  };
  highlightBoxVisible.value = true;
};

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

const saveHighlight = async () => {
  if (!authStore.user || !selectedRange.value) return;

  try {
    await highlightStore.addHighlight({
      userId: authStore.user.uid,
      slug,
      text: selectedText.value,
      range: selectedRange.value
    });

    highlightBoxVisible.value = false;
    selectedText.value = '';
    selectedRange.value = null;
    
    await applyHighlights();
  } catch (error) {
    console.error('Error saving highlight:', error);
  }
};

const removeHighlight = async (highlight) => {
  if (!authStore.user) return;

  try {
    await highlightStore.removeHighlight(authStore.user.uid, highlight);
    await applyHighlights();
  } catch (error) {
    console.error('Error removing highlight:', error);
  }
};

const applyHighlights = async () => {
  await nextTick();
  if (!markdownContent.value) return;

  // Remove existing highlights
  const existingHighlights = markdownContent.value.querySelectorAll('.highlight');
  existingHighlights.forEach(el => {
    const parent = el.parentNode;
    parent.replaceChild(document.createTextNode(el.textContent), el);
  });

  // Apply new highlights
  highlightStore.highlights.forEach(highlight => {
    const walk = document.createTreeWalker(markdownContent.value, NodeFilter.SHOW_TEXT);
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

const handleHighlightRemoval = (event) => {
  const highlight = event.target.closest('.highlight');
  if (highlight) {
    const highlightData = highlightStore.highlights.find(h => h.id === highlight.dataset.highlightId);
    if (highlightData) {
      removeHighlight(highlightData);
    }
  }
};

onMounted(async () => {
  await checkForExercises();

  markdownStore.setPageTitle(slug, locale.value);
  await markdownStore.loadMarkdown(locale.value, slug);

  const unsubscribe = authStore.$subscribe((mutation, state) => {
    if (state.user) {
      accountStore.getThoughts(slug);
      highlightStore.initializeUserHighlights(state.user.id);
      highlightStore.fetchHighlights(state.user.id, slug);
      unsubscribe();
    }
  });

  if (authStore.user) {
    accountStore.getThoughts(slug);
    await highlightStore.initializeUserHighlights(authStore.user.uid);
    await highlightStore.fetchHighlights(authStore.user.uid, slug);
    unsubscribe();
  }

  await nextTick();
  markdownContent.value = document.querySelector('.tu-markdown');
  await applyHighlights();
});
</script>

<template>
  <div>
    <div v-if="accountStore.thoughts.length" class="pt-4">
      <div v-if="thoughtsOpened" class="pb-2">
        <div v-for="thought in accountStore.thoughts" class="flex items-center gap-2 py-0.5">
          <div class="text-xs text-black dark:text-white text-left">
            {{ $t('archive.addedOn') }} {{ locale === "nl" ? $t(`archive.days[${new Date(thought.createdAt.seconds).getDay()}]`) : '' }}
            {{ $t(`archive.months[${new Date(thought.createdAt.seconds).getMonth()}]`).toLowerCase() }}
            {{ locale === "en" ? $t(`archive.days[${new Date(thought.createdAt.seconds).getDay()}]`) : '' }}
          </div>
          <div class="flex items-center gap-2 justify-end">
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ thought.icon }}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ thought.value }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex">
        <a class="text-xs group" href="#" @click="thoughtsOpened = !thoughtsOpened">
          {{thoughtsOpened ? $t('archive.seeAll.opened') : $t('archive.seeAll.closed')}}
        </a>
      </div>
    </div>

    <div class="flex gap-3 pt-4 relative">
      <a v-if="hasExercises" :href="`/exercises/${slug}`" class="button text-sm py-1.5 px-3 rounded-md cursor-pointer transition-all ease-in no-underline font-[400]">
        ⭐️ {{ $t('archive.exercises') }}
      </a>
      <div v-if="authStore.user" @click="thoughtBoxIsVisible = !thoughtBoxIsVisible" class="button text-sm py-1.5 px-3 rounded-md cursor-pointer transition-all ease-in">
        💭 {{ $t('archive.thought') }}
      </div>
      <div :class="thoughtBoxIsVisible ? 'opacity-100 pointer-events-all' : 'opacity-0 pointer-events-none'" class="absolute top-2.5 left-0 flex items-center justify-between bg-gray-200 dark:bg-[#1b1b1b] w-full py-2 sm:py-4 px-3 sm:px-6 rounded transition-all ease-in">
        <div class="flex items-center gap-1.5 sm:gap-3">
          <div>✨</div>
          <input 
            class="bg-gray-200 text-black dark:bg-[#1b1b1b] dark:text-white text-xs p-1.5 focus:outline-none" 
            :placeholder="$t('archive.placeholder')" 
            type="text"
            v-model="accountStore.thought.value"
          >
        </div>
        <div class="flex items-center">
          <div @click="addThought" class="bg-blue-600 text-white dark:text-black text-xs py-1 sm:py-1.5 px-2 sm:px-4 transition-all ease-in hover:bg-blue-700 cursor-pointer rounded">
            {{ $t('archive.submit') }}
          </div>
          <div @click="thoughtBoxIsVisible = !thoughtBoxIsVisible" class="text-xs py-1.5 px-4 transition-all ease-in hover:text-orange-800 cursor-pointer rounded">
            {{ $t('archive.cancel') }} 🔥
          </div>
        </div>
      </div>
    </div>
    
    <div class="pb-4 mt-3 italic">
      /archive/{{ slug }}.md
    </div>

    <div 
      ref="markdownContent"
      class="tu-markdown relative" 
      v-html="markdownStore.content"
      @mouseup="captureHighlight"
      @dblclick="removeHighlight"
    />
    
    
    <div v-if="highlightBoxVisible && authStore.user.uid" class="fixed bottom-4 right-4 flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg z-50">
      <button 
        @click="saveHighlight" 
        class="bg-blue-600 text-white dark:text-black text-xs py-1 px-3 rounded hover:bg-blue-700 transition-colors"
      >
        Save highlight ✨
      </button>
      <button 
        @click="highlightBoxVisible = false" 
        class="text-xs py-1 px-3 hover:text-orange-800 transition-colors"
      >
        Cancel 🔥
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.button {
  @apply bg-gray-100;
  @apply text-black;
  &:hover {
    @apply bg-gray-200;
    @apply text-black;
  }
  @media (prefers-color-scheme: dark) {
    background-color: rgba(#000, 0.25);
    @apply text-white;
    &:hover {
      background-color: rgba(#000, 0.75);
      @apply text-white;
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

.highlight {
  cursor: pointer;
  border-radius: 2px;
  transition: opacity 0.2s;
  @apply bg-yellow-300;
  
  &:hover {
    opacity: 0.8;
  }
}
</style>