import { defineStore } from 'pinia';
import { getFirestore, doc, getDoc, setDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { useAuthStore } from './authStore'; // Adjust the path as necessary
import { v4 as uuidv4 } from 'uuid';

const authStore = useAuthStore();

export const useExerciseStore = defineStore('exercise', {
  state: () => ({
    exerciseDoc: null,
    loading: true,
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

      if (authStore.isLoggedIn && authStore.user) {
        const uid = authStore.user.uid;

        // Query Firestore for saved selections
        const selectionsRef = collection(db, 'completed');
        const q = query(selectionsRef, where('uid', '==', uid), where('slug', '==', slug));
        const querySnapshot = await getDocs(q);
        
        console.log(querySnapshot.docs);
        if (await !querySnapshot.empty) {
          const selectionDoc = querySnapshot.docs[0];
          this.selectedOptions = selectionDoc.data().selectedOptions || {};
        } 
      }
    },

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
      
    }
  },
});
