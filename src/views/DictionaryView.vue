<template>
    <v-app>
        <NavBar />
        <SideBar />
        <v-main>
            <v-container fluid class="my-1">
                <v-card variant="tonal" class="elevation-6">
                    <v-card-text>
                        <v-card-title class="font-weight-bold text-h2 mx-auto text-center">Diccionario</v-card-title><br>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field clearable variant="outlined" color="primary" v-model="searchTerm"
                                    label="Busqueda" outlined placeholder="Busca tu palabra" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-btn @click="search" color="primary" variant="tonal" rounded="lg" size="x-large"
                                    block><v-icon>mdi-magnify</v-icon>Buscar
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-select color="green-accent-3" v-model="searchType" :items="formattedSearchTypes"
                                    label="Selecciona tu opcion" outlined density="comfortable"></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-btn @click="addFav" color="light-green-accent-4" variant="tonal" rounded="lg"
                                    size="x-large" block><v-icon>mdi-heart</v-icon>Favoritos
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-text>
                        <v-row justify="center">
                            <v-col cols="12" md="6">
                                <v-list v-if="results">
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <h2 class="text-center">{{ results.word }}</h2>
                                            </v-list-item-title><br>
                                            <v-list-item-content v-if="results.definition">
                                                <h4 class="text-center"><v-icon>mdi-format-quote-open</v-icon> {{
                                                    results.definition }}<v-icon>mdi-format-quote-close</v-icon> </h4>
                                            </v-list-item-content>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-list v-if="results">
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-group v-if="results.examples">
                                                <v-list-item-title>
                                                    <br>
                                                    <p class="text-center">Ejemplos de la Palabra</p>
                                                </v-list-item-title>
                                                <v-list-item v-for="(example, index) in results.examples" :key="index">
                                                    <p class="text-center">{{ example }}</p>
                                                </v-list-item>
                                            </v-list-item-group>
                                            <v-list-item-title v-if="results.sinonimos">
                                                <h3 class="text-center">Sinonimos</h3>
                                                <p class="text-center">{{ getResultText(results, 'sinonimos') }}</p>
                                            </v-list-item-title>
                                            <v-list-item-title v-if="results.antonimos">
                                                <h3 class="text-center">Antonimos</h3>
                                                <p class="text-center">{{ getResultText(results, 'antonimos') }}</p>
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                                <v-list v-else>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <p class="text-center">La palabra no fue encontrada.</p>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
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
import { ref, onMounted } from 'vue';
import { getAuth } from 'firebase/auth';

export default {
    name: 'DictionaryView',
    components: {
        NavBar,
        SideBar,
    },
    data() {
        return {
            searchTerm: '',
            results: null,
            searchType: '',
            searchTypes: ['definicion', 'sinonimos', 'antonimos'],
        };
    },
    setup() {
        const auth = getAuth();
        const user = ref(auth.currentUser);

        onMounted(() => {
            auth.onAuthStateChanged((newUser) => {
                user.value = newUser;
            });
        });

        return { user };
    },
    computed: {
        formattedSearchTypes() {
            // Cambiar la primera letra a UpperCase
            return this.searchTypes.map(type => type.charAt(0).toUpperCase() + type.slice(1).toLowerCase());
        },
    },
    watch: {
        // Cambiar el searchType automaticamente
        searchType: 'search',
    },
    methods: {
        async search() {
            try {
                const response = await axios.get(`http://4.157.91.179:5000/${this.searchType.toLowerCase()}/${this.searchTerm}`);
                this.results = response.data;
                console.log(this.results._id);
            } catch (error) {
                console.log(error);
                this.results = null;
            }
        },
        getResultText(results, type) {
            if (results) {
                return results[type]?.join(', ') || '';
            }
            return '';
        },
        async addFav() {

            let user = this.$store.getters.getUser;
            let userId = user.user.uid;


            // if (this.results && this.results.word && this.results.definition && this.user.value) {
                try {
                    // MISSING  ID_DICCIONARY
                    let idDiccionary = null;
                    const response = await axios.post('https://conteinaerappsdiccionary.calmmoss-65dacf7d.eastus.azurecontainerapps.io/addFavorite', {
                        userId: userId,
                        word: this.results.word,
                        definition: this.results.definition,
                        idDiccionary: idDiccionary
                        // Add other properties as needed
                    });
                    console.log('Favorite added successfully:', response.data);
                } catch (error) {
                    console.error('Error adding favorite:', error);
                }
            // } else {
                console.log('No word selected or user not logged in');
            // }
        },
    },
};
</script>

<style scoped>
.text-center {
    text-align: center;
}
</style>
