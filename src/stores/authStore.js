import { defineStore } from 'pinia';
import { auth } from '@/js/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, GithubAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';

export const useAuthStore = defineStore('user', {
    state: () => ({
        user: null,
        isLoggedIn: false,
    }),

    getters: {
        userName: (state) => state.user?.name || 'Guest',
    },

    actions: {
        initialize() {
            setPersistence(auth, browserLocalPersistence)
                .then(() => {
                    onAuthStateChanged(auth, (currentUser) => {
                        if (currentUser) {
                          this.user = currentUser; // Set the user in the store
                          this.isLoggedIn = true;  // Update the login status
                        //   console.log("User restored from persistence:", currentUser);
                        } else {
                          this.user = null;      // No user is logged in
                          this.isLoggedIn = false;
                        //   console.log("No user is signed in.");
                        }
                    });
                })
                .catch((error) => {
                    // console.error('Error setting persistence: ', error);
                });
        },
        async login(user) {
            try {
                this.user = user;
                this.isLoggedIn = true;
            } catch (error) {
                // console.error('Login failed:', error.message);
            }
        },
        async logout() {
            try {
                await signOut(auth);
                this.user = null;
                this.isLoggedIn = false;
                console.log('Logged out successfully');
            } catch (error) {
                // console.error('Logout failed:', error.message);
            }
        },
        async googleSignIn() {
            const provider = new GoogleAuthProvider();
    
            try {
                const result = await signInWithPopup(auth, provider);
                this.login(result.user);

                // console.log("User signed in:", user.value);
            } catch (error) {
                // console.error("Sign-in error:", error);
            }
        },
        async githubSignIn() {
            const provider = new GithubAuthProvider();
            try {
                const result = await signInWithPopup(auth, provider);
                this.login(result.user);

                // console.log("Signed in with GitHub:", user.value);
            } catch (error) {
                // console.error("GitHub sign-in error:", error);
            }
        }
    },
});