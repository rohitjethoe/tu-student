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
      <div class="loader"></div> 
    </div>
    <div v-else>
      <div 
        v-for="(question, index) in exerciseStore.exerciseDoc.questions" 
        :key="index" 
        class="pb-28"
      >
        <h3 class="pb-2 font-bold" v-html="renderKaTeXContent(question.title)"></h3>
        <p v-html="renderKaTeXContent(question.context)"></p>
        <ul v-if="question.options">
          <li 
            v-for="(option, key) in question.options" 
            :key="key"
            class="w-full flex items-center gap-2 p-2 border-gray-300 border my-2 capitalize bg-white dark:bg-[#242424]"
            :class="
            `${((exerciseStore.selectedOptions[index] === option) && (option === question.answer)) ? 'bg-green-200 dark:bg-green-300 border-2 border-green-400' : ''}
            ${((exerciseStore.selectedOptions[index] === option) && (option !== question.answer)) ? 'bg-red-300 dark:bg-red-400 border-2 border-red-500' : ''}`" 
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
              :class="{ 'text-blue-500 dark:text-white': option === exerciseStore.selectedOptions[index] }"
            >
              {{ option }}
              <span 
                class="transition-all ease-in"
                :class="`${option === exerciseStore.selectedOptions[index] ? 'opacity-100' : 'opacity-0'}`"
              >  
                {{ option === question.answer ? '🎉' : '🤔' }}
              </span>
            </label>
          </li>
        </ul>
        <div v-else>
          <div>
            <div class="flex items-start mt-6">
              <input 
                type="text" 
                v-model="exerciseStore.selectedOptions[index]" 
                placeholder="Type your answer in LaTeX..."
                class="p-2 w-3/4 text-sm focus:outline-none dark:bg-[#242424] border-2 dark:border-gray-300 rounded-none" 
                :class="(`$$${exerciseStore.selectedOptions[index]}$$` === question.answer) ? 'bg-green-200 dark:bg-green-300 border-2 border-green-400 dark:text-black font-medium' : ''" 
              >
              <button 
                @click="exerciseStore.saveOption(index, exerciseStore.selectedOptions[index])" 
                class="button text-sm p-2 w-1/4 cursor-pointer transition-all ease-in no-underline font-[400] bg-white dark:bg-[#242424] border-2 dark:border-gray-300"
              >
                Submit
              </button>
            </div>
          </div>
          <div class="py-2" v-if="exerciseStore.selectedOptions[index]" v-html="renderKaTeXContent(`$$ ${exerciseStore.selectedOptions[index]} $$`)">
          </div>
        </div>
        <div 
          class="text-xs py-1 transition-all flex gap-2" 
          :class="exerciseStore.selectedOptions[index] ? 'opacity-100 h-auto' : 'opacity-0 h-0'"
        >
          <div class="font-bold">Explanation:</div>
          <ol>
            <li 
              class="pb-2" 
              v-for="(explanationLine, index) in question.explanation"
            >
              <span v-html="renderKaTeXContent(explanationLine)"></span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  width: 16px;
  margin: 0 auto;
  aspect-ratio: 1;
  display:grid;
  -webkit-mask: conic-gradient(from 15deg,#0000,#000);
  animation: l26 1s infinite steps(12);
}
.loader,
.loader:before,
.loader:after{
  background:
    radial-gradient(closest-side at 50% 12.5%,
     #242424 96%,#0000) 50% 0/20% 80% repeat-y,
    radial-gradient(closest-side at 12.5% 50%,
     #242424 96%,#0000) 0 50%/80% 20% repeat-x;
}
.loader:before,
.loader:after {
  content: "";
  grid-area: 1/1;
  transform: rotate(30deg);
}
.loader:after {
  transform: rotate(60deg);
}

@keyframes l26 {
  100% {transform:rotate(1turn)}
}

@media (prefers-color-scheme: dark) {
  .loader,
  .loader:before,
  .loader:after{
    background:
      radial-gradient(closest-side at 50% 12.5%,
      #fff 96%,#0000) 50% 0/20% 80% repeat-y,
      radial-gradient(closest-side at 12.5% 50%,
      #fff 96%,#0000) 0 50%/80% 20% repeat-x;
  }
}
</style>