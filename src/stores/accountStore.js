import { defineStore } from 'pinia';
import { useAuthStore } from './authStore.js';
import { db } from '@/js/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

/**
 * Account Store for managing user thoughts.
 * @module useAccountStore
 */
export const useAccountStore = defineStore('account', {
    state: () => ({
        /**
         * List of user thoughts.
         * @type {Array<Object>}
         */
        thoughts: [],

        /**
         * Template for a thought object.
         * @type {Object}
         * @property {string|null} uid - Google Auth User ID.
         * @property {string} value - Thought content.
         * @property {string} icon - Icon associated with the thought.
         * @property {string} slug - Optional slug for categorization.
         * @property {Date|null} createdAt - Timestamp of thought creation.
         */
        thought: {
            uid: null,
            value: '',
            icon: '✨',
            slug: '',
            createdAt: null
        },
    }),
    actions: {
        /**
         * Add a new thought to the database.
         * @param {string} slug - Optional slug for categorization.
         * @returns {Promise<void>} Resolves when the thought is added.
         */
        async addThought(slug) {    
            const authStore = useAuthStore();

            if (!authStore.isLoggedIn) {
                console.error('User must be logged in to add a thought.');
                return;
            }

            this.thought.uid = authStore.user.uid;
            this.thought.slug = slug;
            this.thought.createdAt = serverTimestamp();     
            
            try {
                const thoughtsCollection = collection(db, 'thoughts');
                await addDoc(thoughtsCollection, this.thought);
                
                this.thought.uid = null;
                this.thought.value = '';
                this.thought.icon = '✨';
                this.thought.slug = '';
                this.thought.createdAt = null;
            } catch (error) {
                console.error('Error adding thought: ', error);
            }
        },

        /**
         * Fetch thoughts from the database.
         * @param {string} [slug] - Optional slug for filtering thoughts.
         * @returns {Promise<void>} Resolves when the thoughts are fetched.
         */
        async getThoughts(slug) {
            const authStore = useAuthStore();
    
            if (!authStore.isLoggedIn) {
                console.error('User must be logged in to add a thought.');
                return;
            }

            try {
                const thoughtsCollection = collection(db, 'thoughts');
                const withSlug = query(thoughtsCollection, where('uid', '==', authStore.user.uid),where('slug', '==', slug));
                const noSlug = query(thoughtsCollection, where('uid', '==', authStore.user.uid))
                const q = slug ? withSlug : noSlug;    
                const querySnapshot = await getDocs(q);
    
                this.thoughts = querySnapshot.docs.map(doc => ({
                    id: doc.id, 
                    ...doc.data(),
                }));
            } catch (error) {
                console.error('Error getting thoughts: ', error);
            }
        }
    },
})