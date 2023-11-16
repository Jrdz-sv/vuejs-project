<template>
  <v-app-bar app color="indigo-darken-4" dark clipped-left class="elevation-0">
    <v-toolbar-title class="font-weight-bold text-h5">Proyecto Final</v-toolbar-title>
    <div class="ml-auto">
      <v-btn @click="handleSignOut" v-if="isLoggedIn" text class="mr-2"><v-icon>mdi-logout</v-icon> Cerrar Sesión</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { ref, onMounted } from 'vue'; // Assuming you're using Vue 3
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default {
  name: 'AppBar',
  setup() {
    const router = useRouter();
    const isLoggedIn = ref(false);
    let auth;

    onMounted(() => {
      auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        isLoggedIn.value = !!user;
      });
    });

    const handleSignOut = () => {
      signOut(auth).then(() => {
        // Assuming you're using Vue Router for navigation
        router.push('/');
      });
    };

    return {
      isLoggedIn,
      handleSignOut,
    };
  },
};
</script>

<style scoped>
.selected {
    background-color: rgba(255, 255, 255, 0.12) !important;
    color: white !important;
}

.elevation {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
}

.user {
    font-size: 25px;
}
</style>


