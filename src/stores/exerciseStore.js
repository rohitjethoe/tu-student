import { defineStore } from 'pinia';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

export const useExerciseStore = defineStore('exercise', {
  state: () => ({
    exerciseDoc: null,
    loading: true,
    error: null,
    selectedOptions: {},
  }),

  actions: {
    async fetchExercise(slug) {
      const db = getFirestore();
      const router = useRouter();

      this.loading = true;
      this.error = null;

      try {
        const docRef = doc(db, 'exercises', slug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.exerciseDoc = docSnap.data();
        } else {
          router.push('/');
        }
      } catch (err) {
        this.error = err.message;
        router.push('/');
      } finally {
        this.loading = false;
      }
    },

    saveOption(index, option) {
      this.selectedOptions = {
        ...this.selectedOptions,
        [index]: option,
      };
    },
  },
});
