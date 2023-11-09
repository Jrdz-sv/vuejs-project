<template>
      <v-app>
        <NavBar/>
        <SideBar/>
        <v-main>
            <v-container fluid class="my-6">
            <v-card class="elevation-2"><br>
                <v-card-title class="font-weight-bold text-h2 mx-auto text-center">Traductor</v-card-title><br>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-select density="comfortable" v-model="idiomaOrigen" :items="idiomas" item-title="name"
                                item-value="code" label="Idioma de Origen"></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-select density="comfortable" v-model="idiomaDestino" :items="idiomas" item-title="name"
                                item-value="code" label="Idioma de Destino"></v-select>
                        </v-col>
                    </v-row>
                    <v-textarea v-model="texto" label="Ingresa el texto a traducir" clearable counter></v-textarea>
                    <v-btn @click="translateText" color="primary" variant="elevated" rounded="lg" size="x-large"
                        block>Traducir</v-btn>
                </v-card-text>
                <v-divider v-if="textoTraducido"></v-divider>
                <div v-if="textoTraducido" class="resultado">
                    <label class="text-h5">Traducción</label>
                    <p class="text-body-1 resultado-text">{{ textoTraducido }}</p>
                </div>
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
    name: 'DashBoard',
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
.resultado {
    margin-top: 20px;
    padding: 10px;
    background-color: #e0e0e0;
    border-radius: 4px;
}

.resultado-text {
    margin-top: 10px;
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 4px;
}
</style>