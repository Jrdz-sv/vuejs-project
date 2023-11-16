<template>
    <v-container fluid class="my-6">
        <v-row justify="center">
            <v-col cols="12" sm="10" md="8">
                <v-card variant="tonal" class="elevation-12">
                    <br>
                    <v-card-title class="font-weight-bold text-h3 mx-auto text-center">Iniciar sesión</v-card-title>
                    <v-card-text>
                        <v-img src="../assets/logo.png" max-height="150" class="mx-auto mt-2"></v-img>
                        <v-form @submit.prevent="login">
                            <v-text-field clearable variant="outlined" color="primary" v-model="username" label="Usuario"
                                required prepend-icon="mdi-account"></v-text-field>
                            <v-text-field clearable variant="outlined" color="primary" v-model="password" label="Contraseña"
                                type="password" required prepend-icon="mdi-lock"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn variant="tonal" color="primary" elevation="8" @click="login" rounded="lg" size="x-large"
                            block>Iniciar Sesion</v-btn>
                    </v-card-actions>
                    <v-card-actions>
                        <v-btn to="/register" variant="tonal" color="red-accent-4" elevation="8" rounded="lg" size="x-large"
                            block>Registrarse</v-btn>
                    </v-card-actions>
                    <br>
                </v-card>
            </v-col>
        </v-row>
        <alert-message :message="alertMessage" :type="alertType" v-if="alertMessage" @close="alertMessage = ''" />
    </v-container>
</template>

<script>
import AlertMessage from '@/components/AlertMessage';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default {
    components: {
        AlertMessage,
    },
    data() {
        return {
            username: '',
            password: '',
            alertMessage: '',
            alertType: '',
        };
    },
    methods: {
        async login() {
            try {
                // Access Firebase authentication
                const auth = getAuth();

                // Sign in user with email and password
                await signInWithEmailAndPassword(auth, this.username, this.password);

                // Redirect or perform other actions after successful login
                this.$router.push('/dictionary');
            } catch (error) {
                // Handle login errors (e.g., display an error message)
                console.error('Error during login:', error.message);
                this.alertMessage = 'Invalid credentials';
                this.alertType = 'error';
            }
        },
    },
};
</script>

<style scoped>
.elevation-12 {
    box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.3), 0 6px 6px -6px rgba(0, 0, 0, 0.3);
}
</style>
