import { defineStore } from 'pinia';
import { auth } from '@/js/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, GithubAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';

/**
 * Auth Store for managing user authentication.
 * @module useAuthStore
 */
export const useAuthStore = defineStore('user', {
    state: () => ({
        user: null,
        isLoggedIn: false
    }),
    actions: {
        /**
         * Initializes the authentication state and sets persistence.
         * Listens for authentication state changes.
         * @returns {void}
         */
        initialize() {
            setPersistence(auth, browserLocalPersistence)
                .then(() => {
                    onAuthStateChanged(auth, (currentUser) => {
                        if (currentUser) {
                          this.user = currentUser;
                          this.isLoggedIn = true;
                        } else {
                          this.user = null;
                          this.isLoggedIn = false;
                        }
                    });
                })
                .catch((error) => {
                    console.error('Error setting persistence: ', error);
                });
        },

        /**
         * Logs in the user by updating state.
         * @param {Object} user - The authenticated user object.
         * @returns {Promise<void>}
         */
        async login(user) {
            try {
                this.user = user;
                this.isLoggedIn = true;
            } catch (error) {
                console.error('Login failed:', error.message);
            }
        },

        /**
         * Logs out the current user and clears state.
         * @returns {Promise<void>}
         */
        async logout() {
            try {
                await signOut(auth);
                this.user = null;
                this.isLoggedIn = false;
                console.log('Logged out successfully');
            } catch (error) {
                console.error('Logout failed:', error.message);
            }
        },

        /**
         * Signs in the user using Google authentication.
         * @returns {Promise<void>}
         */
        async googleSignIn() {
            const provider = new GoogleAuthProvider();
    
            try {
                const result = await signInWithPopup(auth, provider);
                this.login(result.user);
            } catch (error) {
                console.error("Sign-in error:", error);
            }
        },

        /**
         * Signs in the user using GitHub authentication.
         * @returns {Promise<void>}
         */
        async githubSignIn() {
            const provider = new GithubAuthProvider();
            try {
                const result = await signInWithPopup(auth, provider);
                this.login(result.user);
            } catch (error) {
                console.error("GitHub sign-in error:", error);
            }
        }
    },
});