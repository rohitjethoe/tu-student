<script setup>
import { onMounted, nextTick, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/authStore.js';
import { useAccountStore } from '@/stores/accountStore.js';
import { useMarkdownStore } from '@/stores/markdownStore.js';
import { useHighlightStore } from '@/stores/highlightStore.js';
import { useHighlightManager } from '@/stores/highlightManagerStore.js';
import { useExerciseStore } from '@/stores/exerciseStore.js';

const markdownStore = useMarkdownStore();
const authStore = useAuthStore();
const accountStore = useAccountStore();
const highlightStore = useHighlightStore();
const highlightManager = useHighlightManager();
const exerciseStore = useExerciseStore();

const thoughtBoxIsVisible = ref(false);
const thoughtsOpened = ref(false);
const solutionsOpened = ref(false);

const { locale } = useI18n();
const route = useRoute();
const slug = route.params.slug;

const addThought = async () => {
  await accountStore.addThought(slug);
  await accountStore.getThoughts(slug);
  thoughtBoxIsVisible.value = false;
};

const saveHighlight = async () => {
  if (!authStore.user || !highlightManager.selectedRange) return;

  try {
    await highlightStore.addHighlight({
      userId: authStore.user.uid,
      slug,
      text: highlightManager.selectedText,
      range: highlightManager.selectedRange
    });

    highlightManager.resetSelection();
    await highlightManager.applyHighlights(highlightManager.markdownContent, highlightStore.highlights);
  } catch (error) {
    console.error('Error saving highlight:', error);
  }
};

const removeHighlight = async (highlight) => {
  if (!authStore.user) return;

  try {
    await highlightStore.removeHighlight(authStore.user.uid, highlight);
    await highlightManager.applyHighlights(highlightManager.markdownContent, highlightStore.highlights);
  } catch (error) {
    console.error('Error removing highlight:', error);
  }
};

const solutionsHandler = async () => {
  if (solutionsOpened.value) {
    solutionsOpened.value = false;
    await markdownStore.loadMarkdown(locale.value, slug, 'exams');
  } else {
    await markdownStore.loadMarkdown(locale.value, slug, 'solutions');
    solutionsOpened.value = true;
  }
}

const examHandler = async () => {
  if (exerciseStore.finished) {
    await exerciseStore.deleteFinishedExam(slug);
    await exerciseStore.getFinishedExam(slug);
  } else {
    await exerciseStore.addFinishedExam(slug);
    await exerciseStore.getFinishedExam(slug);
  }
}

onMounted(async () => {
  markdownStore.setPageTitle(slug, locale.value);
  await markdownStore.loadMarkdown(locale.value, slug, 'exams');

  const unsubscribe = authStore.$subscribe((mutation, state) => {
    if (state.user) {
      accountStore.getThoughts(slug);
      highlightStore.initializeUserHighlights(state.user.id);
      highlightStore.fetchHighlights(state.user.id, slug);
      exerciseStore.getFinishedExam(slug);
      unsubscribe();
    }
  });

  if (authStore.user) {
    accountStore.getThoughts(slug);
    await highlightStore.initializeUserHighlights(authStore.user.uid);
    await highlightStore.fetchHighlights(authStore.user.uid, slug);
    exerciseStore.getFinishedExam(slug);
    unsubscribe();
  }

  await nextTick();
  highlightManager.markdownContent = document.querySelector('.tu-markdown');
  await highlightManager.applyHighlights(highlightManager.markdownContent, highlightStore.highlights);
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
            <div class="text-xs text-gray-500 dark:text-gray-400">{{ thought.icon }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">{{ thought.value }}</div>
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
      <div v-if="authStore.user" @click="examHandler" class="button finished text-sm py-1.5 px-3 rounded-md cursor-pointer transition-all ease-in select-none" :class="exerciseStore.finished ? 'bg-green-200 hover:bg-green-300' : 'bg-gray-100 hover:bg-gray-200'">
        {{ exerciseStore.finished ? '✅' : '⏺️' }} 
      </div>
      <div v-if="authStore.user" @click="thoughtBoxIsVisible = !thoughtBoxIsVisible" class="button bg-gray-100 hover:bg-gray-200 text-sm py-1.5 px-3 rounded-md cursor-pointer transition-all ease-in select-none">
        💭 {{ $t('archive.thought') }}
      </div>
      <div v-if="authStore.user" @click="solutionsHandler" class="button bg-gray-100 hover:bg-gray-200 text-sm py-1.5 px-3 rounded-md cursor-pointer transition-all ease-in select-none">
         {{ solutionsOpened ? `🎸 ${$t('exams.questions')}` : `🎼  ${$t('exams.solutions')}` }}
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
    
    <div class="pb-3 mt-3 italic">/exams/{{ slug }}.md</div>

    <div 
      class="tu-markdown relative pb-24" 
      v-html="markdownStore.content"
      @mouseup="highlightManager.captureHighlight(highlightManager.markdownContent)"
      @dblclick="removeHighlight"
    />
    
    <div v-if="highlightManager.highlightBoxVisible && authStore.user?.uid" class="fixed bottom-4 right-4 flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg z-50">
      <button 
        @click="saveHighlight" 
        class="bg-blue-600 text-white dark:text-black text-xs py-1 px-3 rounded hover:bg-blue-700 transition-colors"
      >
        Save highlight ✨
      </button>
      <button 
        @click="highlightManager.resetSelection()" 
        class="text-xs py-1 px-3 hover:text-orange-800 transition-colors"
      >
        Cancel 🔥
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.button {
  @apply text-black;
  @media (prefers-color-scheme: dark) {
    background-color: rgba(#000, 0.25);
    @apply text-white;
    &:hover {
      background-color: rgba(#000, 0.75);
      @apply text-white;
    }
  }
}

.highlight {
  cursor: pointer;
  border-radius: 2px;
  transition: opacity 0.2s;
  @apply bg-yellow-300;
  
  &:hover {
    opacity: 0.8;
  }

  @media (prefers-color-scheme: dark) {
    @apply bg-yellow-500;
  }
}
</style>