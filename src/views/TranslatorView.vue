<template>
    <v-app>
        <NavBar />
        <SideBar />
        <v-main>
            <v-container fluid class="my-1">
                <v-card variant="tonal" class="elevation-6">
                    <v-card-text>
                        <v-card-title class="font-weight-bold text-h2 mx-auto text-center">Traductor</v-card-title><br>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-select density="comfortable" color="light-blue-accent-4" v-model="idiomaOrigen" :items="idiomas" item-title="name"
                                    item-value="code" label="Idioma de Origen"></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-select density="comfortable" color="green-accent-3" v-model="idiomaDestino" :items="idiomas" item-title="name"
                                    item-value="code" label="Idioma de Destino"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-textarea variant="outlined" color="primary" v-model="texto" label="Ingresa el texto a traducir" clearable
                                    counter></v-textarea>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-card v-if="textoTraducido" color="light-blue-lighten-5" class="result-card" elevation="2">
                                    <v-card-title class="result-title">Traducción</v-card-title>
                                    <v-card-text class="result-text">{{ textoTraducido }}</v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-btn @click="translateText" color="green-accent-4" variant="tonal" rounded="lg" size="x-large"
                            block><v-icon>mdi-autorenew</v-icon>Traducir</v-btn>
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
    name: 'TranslatorView',
    components: {
        NavBar,
        SideBar,
    },
    data() {
        return {
            idiomaOrigen: 'es',
            idiomaDestino: 'en',
            texto: '',
            textoTraducido: '',

            idiomas: [
                {
                    name: "Español",
                    code: "es"
                },
                {
                    name: "Inglés",
                    code: "en"
                },
                {
                    name: "Francés",
                    code: "fr"
                },
                {
                    name: "Alemán",
                    code: "de"
                },
                {
                    name: "Italiano",
                    code: "it"
                },
                {
                    name: "Ruso",
                    code: "ru"
                }
            ],
            apiKey: '076cc5abebmsh72f5acdadfaa2f8p1683f0jsn25cc92355561',
        };
    },
    watch: {
        idiomaOrigen: 'translateText',
        idiomaDestino: 'translateText',
        texto: 'resetTranslatedText',
    },
    methods: {
        async translateText() {
            if (this.texto) {
                const options = {
                    method: 'POST',
                    url: 'https://ai-translation-apis.p.rapidapi.com/',
                    headers: {
                        'content-type': 'application/json',
                        'X-RapidAPI-Key': this.apiKey,
                        'X-RapidAPI-Host': 'ai-translation-apis.p.rapidapi.com',
                    },
                    data: {
                        fromLan: this.idiomaOrigen,
                        toLan: this.idiomaDestino,
                        text: this.texto,
                    },
                };

                try {
                    const response = await axios.request(options);
                    this.textoTraducido = response.data.data.translated;
                } catch (error) {
                    console.log(error);
                }
            }
        },
        resetTranslatedText() {
            this.textoTraducido = '';
        },
    },
};
</script>

<style scoped>
.result-card {
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
}

.result-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.result-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.result-text {
  font-size: 1rem;
  color: black;
}
</style>