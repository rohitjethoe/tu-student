<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { auth } from "@/js/firebase";
import { 
    signInWithPopup, 
    GoogleAuthProvider, 
    GithubAuthProvider, 
    setPersistence, 
    browserLocalPersistence, 
    onAuthStateChanged 
} from "firebase/auth";

const user = ref(null);
const router = useRouter();

setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Error setting persistence: ", error);
});

const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    
    try {
        const result = await signInWithPopup(auth, provider);
        user.value = result.user;
        console.log("User signed in:", user.value);
    } catch (error) {
        console.error("Sign-in error:", error);
    }
}

const githubSignIn = async () => {
  const provider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    user.value = result.user; 
    console.log("Signed in with GitHub:", user.value);
  } catch (error) {
    console.error("GitHub sign-in error:", error);
  }
};

const logout = async () => {
  try {
    await auth.signOut();
    user.value = null;
    console.log("User logged out.");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
    if (currentUser) {
    //   console.log("User restored from persistence:", currentUser);
      router.push({ name: "Home" });
    } else {
    //   console.log("No user is signed in.");
    }
  });
});
</script>

<template>
    <div class="pt-3 flex flex-col items-center gap-3">
        <button @click="googleSignIn" class="flex items-center gap-3 outline-none bg-[#242424] dark:bg-white py-3 px-12 rounded w-full justify-center opacity-100 transition-opacity ease-in hover:opacity-90">
            <img class="w-3 h-3" src="@/assets/google-icon.png" alt="">
            <span class="text-white dark:text-[#242424] text-sm font-medium">
                {{ $t('login.button') }} Google
            </span>
        </button>
        <button @click="githubSignIn" class="flex items-center gap-3 outline-none bg-[#242424] dark:bg-white py-3 px-12 rounded w-full justify-center opacity-100 transition-opacity ease-in hover:opacity-90">
            <img class="hidden dark:block w-3 h-3" src="@/assets/github-icon.svg" alt="">
            <img class="block dark:hidden w-3 h-3" src="@/assets/github-iconLight.svg" alt="">
            <span class="text-white dark:text-[#242424] text-sm font-medium">
                {{ $t('login.button') }} Github
            </span>
        </button>
        <a class="text-sm" href="/about">about tustudent.blog</a>
    </div>
</template>