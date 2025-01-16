import { defineStore } from 'pinia';
import { getFirestore, doc, getDoc, setDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { useAuthStore } from './authStore'; // Adjust the path as necessary
import { v4 as uuidv4 } from 'uuid';

const authStore = useAuthStore();

/**
 * Exercise Store for managing exercises and user selections.
 * @module useExerciseStore
 */
export const useExerciseStore = defineStore('exercise', {
  state: () => ({
    /**
     * The currently loaded exercise document.
     * @type {Object|null}
     */
    exerciseDoc: null,

    /**
     * Whether the store is in a loading state.
     * @type {boolean}
     */
    loading: true,

    /**
     * The options selected by the user for the exercise.
     * @type {Object}
     */
    selectedOptions: {},

    /**
     * Whether the exam is finished by the user.
     * @type {boolean}
     */
    finished: false,
  }),

  actions: {
    /**
     * Fetches an exercise by slug and loads user selections if authenticated.
     * @param {string} slug - The unique identifier for the exercise.
     * @returns {Promise<void>}
     */
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
        } 
      } catch (err) {
        this.error = err.message;
        router.push('/');
      } finally {
        this.loading = false;
      }

      if (authStore.isLoggedIn && authStore.user) {
        const uid = authStore.user.uid;

        // Query Firestore for saved selections
        const selectionsRef = collection(db, 'completed');
        const q = query(selectionsRef, where('uid', '==', uid), where('slug', '==', slug));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.size > 0) {
          const selectionDoc = querySnapshot.docs[0];
          this.selectedOptions = selectionDoc.data().selectedOptions || {};
        } 
      }
    },

    /**
     * Deletes the existing saved selection for the current exercise, if any.
     * @returns {Promise<void>}
     */
    async deleteOption() {
      if (!authStore.isLoggedIn || !authStore.user) {
        console.error('User is not authenticated. Cannot delete selection.');
        return;
      }

      try {
        const db = getFirestore();
        const uid = authStore.user.uid;
        const slug = this.exerciseDoc.slug;
    
        const selectionsRef = collection(db, 'completed');
        const q = query(selectionsRef, where('uid', '==', uid), where('slug', '==', slug));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
          const deletePromises = querySnapshot.docs.map(docSnap => deleteDoc(docSnap.ref)); 
          await Promise.all(deletePromises);
          console.log('Selection deleted successfully from Firestore.');
        } else {
          console.log('No matching document found to delete.');
        }
      } catch (error) {
        console.error('Error deleting selection from Firestore:', error);
      }
    },

    /**
     * Saves the selected option for the current exercise.
     * @param {number} index - The index of the option being saved.
     * @param {string} option - The selected option.
     * @returns {Promise<void>}
     */
    async saveOption(index, option) {
      this.selectedOptions = {
        ...this.selectedOptions,
        [index]: option,
      };

      if (!authStore.isLoggedIn || !authStore.user) {
        console.error('User is not authenticated. Cannot save options.');
        return;
      }

      await this.deleteOption();

      try {
        const db = getFirestore();
        const uid = authStore.user.uid;
        const slug = this.exerciseDoc.slug;

        const docRef = doc(db, 'completed', uuidv4());
        await setDoc(docRef, {
          uid,
          slug,
          selectedOptions: this.selectedOptions,
          timestamp: new Date().toISOString(),
        });
        console.log('Selection saved successfully to Firestore.');
      } catch (error) {
        console.error('Error saving selection to Firestore:', error);
      }
    },

    /**
     * Retrieves the finished exam details for the given slug.
     * @param {string} slug - The unique identifier for the exam.
     * @returns {Promise<void>}
     */
    async getFinishedExam(slug) {
      try {
        const db = getFirestore();
        const uid = authStore.user.uid;

        const completedRef = collection(db, 'completed');
        const q = query(completedRef, where('uid', '==', uid), where('slug', '==', slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          this.finished = docData.finished;
          console.log('Retrieved finished exam data:', docData);
        } else {
          this.selectedOptions = {}; // Default if no data
          this.finished = false;
          console.log('No finished exam found for the provided slug.');
        }
      } catch (error) {
        console.error('Error retrieving finished exam:', error);
      }
    },

    /**
     * Adds a finished exam for the user.
     * @param {string} slug - The unique identifier for the exam.
     * @returns {Promise<void>}
     */
    async addFinishedExam(slug) {
      try {
        const db = getFirestore();
        const uid = authStore.user.uid;

        const docRef = doc(db, 'completed', uuidv4());
        await setDoc(docRef, {
          uid,
          slug,
          finished: true,
          timestamp: new Date().toISOString(),
        });

        console.log('Finished exam added successfully.');
      } catch (error) {
        console.error('Error adding finished exam:', error);
      }
    },

    /**
     * Deletes a finished exam for the user.
     * @param {string} slug - The unique identifier for the exam.
     * @returns {Promise<void>}
     */
    async deleteFinishedExam(slug) {
      try {
        const db = getFirestore();
        const uid = authStore.user.uid;

        const completedRef = collection(db, 'completed');
        const q = query(completedRef, where('uid', '==', uid), where('slug', '==', slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const deletePromises = querySnapshot.docs.map(docSnap => deleteDoc(docSnap.ref));
          await Promise.all(deletePromises);
          this.finished = false;
          console.log('Finished exam deleted successfully.');
        } else {
          console.log('No matching document found to delete.');
        }
      } catch (error) {
        console.error('Error deleting finished exam:', error);
      }
    },
  },
});
