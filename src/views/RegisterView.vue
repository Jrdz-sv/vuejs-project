<template>
    <v-container fluid class="my-1">
        <v-row justify="center">
            <v-col cols="12" sm="10" md="8">
                <v-card variant="tonal" class="elevation-12"><br>
                    <v-card-title class="font-weight-bold text-h3 mx-auto text-center">Crear cuenta</v-card-title>
                    <v-card-text>
                        <v-img src="../assets/logo.png" max-height="100" class="mx-auto mt-2"></v-img>
                        <v-form @submit.prevent="submitForm">
                            <v-text-field clearable variant="outlined" color="primary" v-model="firstName" label="Nombres"
                                prepend-icon="mdi-account" required></v-text-field>
                            <v-text-field clearable variant="outlined" color="primary" v-model="lastName" label="Apellidos"
                                prepend-icon="mdi-account" required></v-text-field>
                            <v-text-field clearable variant="outlined" color="primary" v-model="email" label="Email"
                                type="email" prepend-icon="mdi-email" required></v-text-field>
                            <v-text-field clearable variant="outlined" color="primary" v-model="password" label="Contraseña"
                                type="password" prepend-icon="mdi-lock" required></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-row justify="center">
                            <v-col cols="12" sm="6" md="4">
                                <v-btn to="/" variant="tonal" color="red-accent-4" elevation="8" rounded="lg"
                                    size="x-large" block>Regresar a Login</v-btn>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-btn variant="tonal" color="primary" elevation="8" @click="submitForm" rounded="lg"
                                    size="x-large" block>Registrarse</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions><br>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        };
    },
    methods: {
        submitForm() {

        },
    },
};
</script>

<style scoped>
.elevation-12 {
    box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.3),
        0 6px 6px -6px rgba(0, 0, 0, 0.3);
}
</style>
