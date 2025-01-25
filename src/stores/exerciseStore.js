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
     * Whether the exam is finished by the user.
     * @type {boolean}
     */
    finished: false,

    /**
     * Whether the exam is finished by the user.
     * @type {Array}
     */
    finishedExams: [],
  }),

  actions: {
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
          // console.log('Retrieved finished exam data:', docData);
        } else {
          this.selectedOptions = {}; // Default if no data
          this.finished = false;
          // console.log('No finished exam found for the provided slug.');
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

        // console.log('Finished exam added successfully.');
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
          // console.log('Finished exam deleted successfully.');
        } else {
          // console.log('No matching document found to delete.');
        }
      } catch (error) {
        console.error('Error deleting finished exam:', error);
      }
    },

    /**
     * Retrieves all finished exams for the current authenticated user.
     * This function queries the 'completed' collection in Firestore to 
     * fetch all documents where the user has completed the exam (finished = true).
     * The resulting data is stored in the finishedExams state property.
     *
     * @returns {Promise<void>} A promise that resolves once the finished exams 
     *                          are fetched from Firestore and stored in the state.
     * 
     * @throws {Error} If there is an error during the Firestore query, it will be 
     *                 logged in the console.
     */
    async getFinishedExams() {
      try {
        const db = getFirestore();
        const uid = authStore.user.uid;

        const completedRef = collection(db, 'completed');
        const q = query(completedRef, where('uid', '==', uid), where('finished', '==', true));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          this.finishedExams = querySnapshot.docs.map(docSnap => docSnap.data());
          // console.log('Finished exams retrieved successfully:', this.finishedExams);
        } else {
          this.finishedExams = [];
          // console.log('No finished exams found for this user.');
        }
      } catch (error) {
        console.error('Error retrieving finished exams:', error);
      }
    },
  },
});
