<template>
    <v-app>
        <NavBar />
        <SideBar />
        <v-main>
            <v-container class="my-6">
                <v-card class="elevation-2">
                    <br />
                    <v-card-title class="text-h3 text-center">Diccionario</v-card-title>
                    <br />
                    <v-card-text class="text-center">
                        <v-row justify="center">
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="terminoBuscado" label="Buscar palabra" outlined
                                    @input="buscarPalabra" />
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-btn @click="buscarPalabra" color="primary" class="mt-1" elevation="8" rounded="lg"
                                    size="x-large" block>
                                    Buscar
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-divider v-if="resultadosBusqueda.length > 0"></v-divider>
                        <v-row v-if="resultadosBusqueda.length > 0">
                            <v-col v-for="(resultado, index) in resultadosBusqueda" :key="index" cols="12" sm="6" md="4">
                                <v-card class="dictionary">
                                    <v-card-title>{{ resultado.word }}</v-card-title>
                                    <v-card-text>
                                        <p>{{ resultado.definition }}</p>
                                        <ul>
                                            <li v-for="(example, i) in resultado.examples" :key="i">{{ example }}</li>
                                        </ul>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue';

export default {
    name: 'DictionaryView',
    components: {
        NavBar,
        SideBar,
    },
    data() {
        return {
            terminoBuscado: '',
            resultadosBusqueda: [],
        };
    },
    methods: {
        async buscarPalabra() {
            // Realizar la solicitud HTTP al endpoint
            try {
                const response = await axios.get(`http://4.157.91.179:5000/definicion/${this.terminoBuscado}`);
                // Actualizar los resultados
                this.resultadosBusqueda = [response.data];
            } catch (error) {
                console.log('Error al buscar la palabra:', error);
            }
        },
    },
};
</script>

<style scoped>
.dictionary {
    margin-bottom: 20px;
}
</style>
