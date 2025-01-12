import { defineStore } from 'pinia';
import { db } from '@/js/firebase.js';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

/**
 * Exercise Store for managing exercises and user selections.
 * @module useHighlightStore
 */
export const useHighlightStore = defineStore('highlight', {
  state: () => ({
    /**
     * The list of highlights for the user.
     * @type {Array<Object>}
     */
    highlights: [],

    /**
     * Whether the store is in a loading state.
     * @type {boolean}
     */
    loading: false,

    /**
     * The error message, if any.
     * @type {string|null}
     */
    error: null
  }),

  actions: {
    /**
     * Initializes the highlights for a user in Firestore.
     * If the document does not exist, it creates a new one with an empty highlights array.
     * @param {string} userId - The ID of the user.
     * @returns {Promise<void>}
     */
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

    /**
     * Adds a new highlight for a user in Firestore.
     * @param {Object} highlight - The highlight data.
     * @param {string} highlight.userId - The ID of the user.
     * @param {string} highlight.slug - The slug associated with the highlight.
     * @param {string} highlight.text - The text of the highlight.
     * @param {Object} highlight.range - The range of the highlight.
     * @returns {Promise<Object>} The added highlight data.
     */
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

    /**
     * Removes a highlight for a user in Firestore.
     * @param {string} userId - The ID of the user.
     * @param {Object} highlightData - The highlight data to be removed.
     * @returns {Promise<void>}
     */
    async removeHighlight(userId, highlightData) {
      try {
        const userHighlightsRef = doc(db, 'highlights', userId);

        this.highlights = this.highlights.filter(
          (h) => h.text !== highlightData.target.textContent
        );

        await updateDoc(userHighlightsRef, {
          highlights: this.highlights,
        });
      } catch (error) {
        console.error('Error removing highlight:', error);
        this.error = error.message;
      }
    },

    /**
     * Fetches highlights for a user and a specific slug from Firestore.
     * @param {string} userId - The ID of the user.
     * @param {string} slug - The slug associated with the highlights.
     * @returns {Promise<void>}
     */
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