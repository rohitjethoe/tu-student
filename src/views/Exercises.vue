<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMarkdownStore } from '@/stores/markdownStore';
import { useExerciseStore } from '@/stores/exerciseStore';

const markdownStore = useMarkdownStore();
const exerciseStore = useExerciseStore();

const route = useRoute();
const slug = route.params.slug;

const renderKaTeXContent = (text) => {
  return markdownStore.renderTextWithKaTeX(text);
};

onMounted(() => {
  exerciseStore.fetchExercise(slug);
});
</script>

<template>
  <div>
    <div class="pb-4 mt-3 italic">
      /exercises/{{ slug }}.md
    </div>
    <div v-if="exerciseStore.loading">
      Loading...
    </div>
    <div v-else-if="exerciseStore.error">
      Error: {{ exerciseStore.error }}
    </div>
    <div v-else>
      <div v-for="(question, index) in exerciseStore.exerciseDoc.questions" :key="index">
        <h3 class="pb-2 font-bold" v-html="renderKaTeXContent(question.title)"></h3>
        <p v-html="renderKaTeXContent(question.context)"></p>
        <ul>
          <li 
            v-for="(option, key) in question.options" 
            class="w-full flex items-center gap-2 p-2 border-gray-300 border my-2 capitalize"
            :class="(exerciseStore.selectedOptions[index] === option) && (option == question.answer) ? 'border-green-200 border-2 bg-green-100 dark:bg-green-300 dark:border-green-500' : 'border-gray-300 bg-white dark:bg-[#242424]'" 
            :key="key"
          >
            <input 
              @click="exerciseStore.saveOption(index, option)"
              type="radio" 
              :name="`question-${index}`" 
              :id="`option-${index}-${key}`"
            >
            <label 
              :for="'option-' + index + '-' + key" 
              class="flex justify-between w-full pr-2"
              :class="{ 'text-blue-500': option === exerciseStore.selectedOptions[index] }"
            >
              {{ option }}
              <span 
                class="transition-all ease-in"
                :class="`${option === question.answer ? 'block' : 'hidden'} ${option === exerciseStore.selectedOptions[index] ? 'opacity-100' : 'opacity-0'}`"
              >  
                🎉
              </span>
            </label>
          </li>
        </ul>
        <div class="text-xs py-1 transition-all" :class="exerciseStore.selectedOptions[index] ? 'opacity-100' : 'opacity-0'">
          <span class="font-bold">Explanation</span>:
          {{ question.explanation }}
        </div>
      </div>
    </div>
  </div>
</template>
