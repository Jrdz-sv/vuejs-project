<template>
    <v-container fluid class="my-3">
        <v-row justify="center">
            <v-col cols="12" sm="10" md="8">
                <v-card variant="tonal" class="elevation-12">
                    <v-card-title class="font-weight-bold text-h3 mx-auto text-center">Crear cuenta</v-card-title>
                    <v-card-text>
                        <v-img src="../assets/logo.png" max-height="120" class="mx-auto mt-2"></v-img>
                        <v-form @submit.prevent="submitForm">
                            <v-text-field clearable variant="outlined" color="primary" v-model="email" label="Email"
                                type="email" prepend-icon="mdi-email" required></v-text-field>
                            <v-text-field clearable variant="outlined" color="primary" v-model="password" label="Contraseña"
                                type="password" prepend-icon="mdi-lock" required></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-row justify="center">
                            <v-col cols="12" sm="6" md="4">
                                <v-btn to="/" variant="tonal" color="red-accent-4" elevation="8" rounded="lg" size="x-large"
                                    block>
                                    Regresar a Login
                                </v-btn>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-btn variant="tonal" color="primary" elevation="8" @click="submitForm" rounded="lg"
                                    size="x-large" block>
                                    Registrarse
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                    <br />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        async submitForm() {
            if (!this.validateForm()) {
                return;
            }

            try {
                const auth = getAuth();

                // Create user with email and password
                await createUserWithEmailAndPassword(auth, this.email, this.password);

                // Success toast and redirect to login page
                this.showToastSuccess('¡Cuenta creada exitosamente!');
                this.$router.push('/register');

            } catch (error) {
                console.error('Error during registration:', error.message);

                // Check if the error indicates that the email is already in use
                if (error.code === 'auth/email-already-in-use') {
                    this.showToastError('¡El correo electrónico ya está registrado!');
                } else {
                    // Show a generic error message for other registration errors
                    this.showToastError('¡Error durante el registro. Por favor, inténtelo de nuevo!');
                }
            }
        },
        validateForm() {
            if (!this.email || !this.password) {
                this.showToastWarning('¡Ingrese una correo y contraseña!');
                return false;
            }

            if (this.password.length < 6) {
                this.showToastWarning('¡La contraseña debe tener al menos 6 caracteres!');
                return false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.email)) {
                this.showToastWarning('¡Ingrese un correo electrónico válido!');
                return false;
            }

            return true;
        },
        showToastSuccess(message) {
            toast.success(message, {
                autoClose: 3500,
                theme: 'colored',
                position: 'top-center',
                transition: 'bounce',
            });
        },
        showToastError(message) {
            toast.error(message, {
                autoClose: 3500,
                theme: 'colored',
                position: 'top-right',
                transition: 'bounce',
            });
        },
        showToastWarning(message) {
            toast.warning(message, {
                autoClose: 3500,
                theme: 'colored',
                position: 'top-left',
                transition: 'bounce',
            });
        },
        getErrorMessage(errorCode) {
            switch (errorCode) {
                case 'auth/invalid-email':
                    return '¡El formato del correo electrónico es inválido!';
                case 'auth/weak-password':
                    return '¡La contraseña debe tener al menos 6 caracteres!';
                default:
                    return '¡Error durante el registro. Por favor, inténtelo de nuevo!';
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
