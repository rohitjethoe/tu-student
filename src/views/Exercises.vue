<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const route = useRoute();
const router = useRouter();
const slug = route.params.slug;

const exerciseDoc = ref(null);
const loading = ref(true);
const error = ref(null);

const db = getFirestore();

const fetchExercise = async (slug) => {
  try {
    const docRef = doc(db, 'exercises', slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      exerciseDoc.value = docSnap.data();
    } else {
      router.push('/');
    }
  } catch (err) {
    error.value = err.message;
    router.push('/');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchExercise(slug);
});
</script>

<template>
  <div>
    <div class="pb-4 mt-3 italic">
      /exercises/{{ slug }}.md
    </div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else-if="error">
      Error: {{ error }}
    </div>
    <div v-else>
      <h1>{{ exerciseDoc.title }}</h1>
      <p>{{ exerciseDoc.description }}</p>
      <div v-for="(question, index) in exerciseDoc.questions" :key="index">
        <h3>{{ question.title }}</h3>
        <p>{{ question.context }}</p>
        <ul>
          <li v-for="(option, key) in question.options" :key="key">
            {{ key }}: {{ option }}
          </li>
        </ul>
        <p><strong>Answer:</strong> {{ question.answer }}</p>
        <p><strong>Explanation:</strong> {{ question.explanation }}</p>
      </div>
    </div>
  </div>
</template>
