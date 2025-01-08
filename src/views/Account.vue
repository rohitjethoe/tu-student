<script setup>
import { ref, onMounted } from "vue";
import { auth } from '@/js/firebase';
import { onAuthStateChanged } from "firebase/auth";

const user = ref(null)
const menuOpened = ref(false)

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
      console.log("User restored from persistence:", currentUser);
    } else {
      console.log("No user is signed in.");
    }
  });
});
</script>

<template>
    <div v-if="user" class="fixed w-full top-0 left-0">
        <div class="bg-black text-white w-full px-4 py-2 text-sm flex justify-between">
            <div @click="menuOpened = !menuOpened" class="toggle select-none hover:cursor-pointer">
                {{ user.email }}
            </div>
            <div @click="logout" class="select-none hover:cursor-pointer">
                {{ $t('logout.title') }}
            </div>
        </div>
        <div class="h-0 bg-[rgba(0,0,0,0)] text-[rgba(255,255,255,0)] px-4 py-2 transition-bg transition-text ease-in" :class="menuOpened ? 'h-full bg-[rgba(0,0,0,0.75)] text-[rgba(255,255,255,1)]' : ''">
            <ul>
                <li>
                    
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.toggle::after {
    display: inline-block;
    margin-left: .255em;
    vertical-align: .255em;
    content: "";
    border-top: .3em solid;
    border-right: .3em solid transparent;
    border-bottom: 0;
    border-left: .3em solid transparent;
}
</style>