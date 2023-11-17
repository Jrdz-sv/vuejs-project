<template>
    <v-container fluid class="my-6">
        <v-row justify="center">
            <v-col cols="12" sm="10" md="8">
                <v-card variant="tonal" class="elevation-12">
                    <br>
                    <v-card-title class="font-weight-bold text-h3 mx-auto text-center">Iniciar sesión</v-card-title>
                    <v-card-text>
                        <v-img src="../assets/logo.png" max-height="120" class="mx-auto mt-2"></v-img>
                        <v-form @submit.prevent="login">
                            <v-text-field clearable variant="outlined" color="primary" v-model="username" label="Usuario"
                                required prepend-icon="mdi-account"></v-text-field>
                            <v-text-field clearable variant="outlined" color="primary" v-model="password" label="Contraseña"
                                type="password" required prepend-icon="mdi-lock"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn variant="tonal" color="primary" elevation="8" @click="handleLogin" rounded="lg"
                            size="x-large" block>
                            Iniciar Sesion
                        </v-btn>
                    </v-card-actions>
                    <v-card-actions>
                        <v-btn to="/register" variant="tonal" color="red-accent-4" elevation="8" rounded="lg" size="x-large"
                            block>
                            Registrarse
                        </v-btn>
                    </v-card-actions>
                    <br>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        async login() {
            try {
                const auth = getAuth();

                // Sign in user with email and password
                let user = await signInWithEmailAndPassword(auth, this.username, this.password);
                this.$store.dispatch('actionSetUser', user);

                // Show the success toast and redirect after a delay
                await this.showSuccessToast();
                this.$router.push('/dictionary');

            } catch (error) {
                console.error('Error during login:', error.message);
                this.showToastError();
            }
        },
        async showSuccessToast() {
            return new Promise((resolve) => {
                toast.success('¡Inicio de sesión exitoso!', {
                    autoClose: 1000,
                    theme: 'colored',
                    position: 'top-center',
                    transition: 'bounce',
                });

                // Resolve the promise after a delay
                setTimeout(resolve, 900);
            });
        },
        handleLogin() {
            if (!this.username || !this.password) {
                this.showToastWarning();
                return;
            }

            this.login();
        },
        showToastError() {
            toast.error('¡Credenciales Incorrectos!', {
                autoClose: 3500,
                theme: 'colored',
                position: 'top-right',
                transition: 'bounce',
            });
        },
        showToastWarning() {
            toast.warning('¡Ingrese sus credenciales!', {
                autoClose: 3500,
                theme: 'colored',
                position: 'top-left',
                transition: 'bounce',
            });
        },
    },
};
</script>

<style scoped>
.elevation-12 {
    box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.3), 0 6px 6px -6px rgba(0, 0, 0, 0.3);
}
</style>
