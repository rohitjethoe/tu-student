<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/authStore.js';
import { useAccountStore } from '@/stores/accountStore.js';
import { useMarkdownStore } from '@/stores/markdownStore.js';
import { db } from '@/js/firebase.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

const type = computed(() => {
  const path = route.path;
  if (path.startsWith('/archive/')) return 'archive';
  if (path.startsWith('/exercises/')) return 'exercises';
  throw new Error('Invalid route path');
});

const hasExercises = ref(false);

const { locale } = useI18n();
const route = useRoute();
const slug = route.params.slug;

const markdownStore = useMarkdownStore();
const authStore = useAuthStore();
const accountStore = useAccountStore();

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

onMounted(async () => {
  await checkForExercises();

  markdownStore.setPageTitle(slug, locale.value);
  markdownStore.loadMarkdown(locale.value, slug, type.value);

  const unsubscribe = authStore.$subscribe((mutation, state) => {
    if (state.user) {
      accountStore.getThoughts(slug);
      unsubscribe();
    }
  });

  if (authStore.user) {
    accountStore.getThoughts(slug);
    unsubscribe();
  }
});
</script>

<template>
  <div>
    <div v-if="authStore.user" class="pt-4">
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
        <a class="text-xs group" href="#" @click="thoughtsOpened = !thoughtsOpened">{{thoughtsOpened ? $t('archive.seeAll.opened') : $t('archive.seeAll.closed')}}</a>
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
    <div class="tu-markdown" v-html="markdownStore.content"></div>
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
</style>