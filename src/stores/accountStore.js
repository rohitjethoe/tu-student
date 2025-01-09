import { defineStore } from 'pinia';
import { useAuthStore } from './authStore.js';
import { db } from '@/js/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

export const useAccountStore = defineStore('account', {
    state: () => ({
        thoughts: [],
        thought: {
            uid: null,
            value: '',
            icon: '✨',
            slug: '',
            createdAt: null
        },
    }),
    actions: {
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

        async getThoughts(slug) {
            const authStore = useAuthStore();
    
            if (!authStore.isLoggedIn) {
                console.error('User must be logged in to add a thought.');
                return;
            }
    
            try {
                const thoughtsCollection = collection(db, 'thoughts');
    
                const q = query(
                    thoughtsCollection, 
                    where('uid', '==', authStore.user.uid),
                    where('slug', '==', slug)
                );
    
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