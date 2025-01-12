// highlightStore.js
import { defineStore } from 'pinia';
import { db } from '@/js/firebase.js';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export const useHighlightStore = defineStore('highlight', {
  state: () => ({
    highlights: [],
    loading: false,
    error: null
  }),

  actions: {
    async initializeUserHighlights(userId) {
      try {
        const userHighlightsRef = doc(db, 'highlights', userId);
        const docSnap = await getDoc(userHighlightsRef);
        
        if (!docSnap.exists()) {
          await setDoc(userHighlightsRef, {
            highlights: []
          });
        }
      } catch (error) {
        console.error('Error initializing highlights:', error);
        this.error = error.message;
      }
    },

    async addHighlight({ userId, slug, text, range }) {
      try {
        const userHighlightsRef = doc(db, 'highlights', userId);
        
        const highlightData = {
          id: `${slug}-${Date.now()}`,
          slug,
          text,
          range,
          createdAt: new Date().toISOString()
        };

        await updateDoc(userHighlightsRef, {
          highlights: arrayUnion(highlightData)
        });

        this.highlights.push(highlightData);
        return highlightData;
      } catch (error) {
        console.error('Error adding highlight:', error);
        this.error = error.message;
        throw error;
      }
    },

    async removeHighlight(userId, highlightData) {
      try {
        const userHighlightsRef = doc(db, 'highlights', userId);
        
        await updateDoc(userHighlightsRef, {
          highlights: arrayRemove(highlightData)
        });

        this.highlights = this.highlights.filter(h => h.id !== highlightData.id);
      } catch (error) {
        console.error('Error removing highlight:', error);
        this.error = error.message;
      }
    },

    async fetchHighlights(userId, slug) {
      this.loading = true;
      try {
        const userHighlightsRef = doc(db, 'highlights', userId);
        const docSnap = await getDoc(userHighlightsRef);
        
        if (docSnap.exists()) {
          const allHighlights = docSnap.data().highlights || [];
          this.highlights = allHighlights.filter(h => h.slug === slug);
        } else {
          this.highlights = [];
        }
      } catch (error) {
        console.error('Error fetching highlights:', error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    }
  }
});