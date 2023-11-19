<template>
    <v-app>
        <NavBar />
        <SideBar />
        <v-main>
            <v-container>
                <v-card>
                    <v-card-title>Mis favoritos</v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-item v-for="(fav, i) in favsWords" :key="i">
                                <v-list-item-content>
                                    <v-row align="center">
                                        <v-col cols="10" @click="showFav(fav)">
                                            <v-list-item-title>{{ fav.favoritos.word }}</v-list-item-title>
                                        </v-col>
                                        <v-col cols="1">
                                            <v-btn @click="showFav(fav)" icon color="primary">
                                                <v-icon>mdi-eye</v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="1">
                                            <v-btn @click="deleteFav(fav.favoritos._id.$oid, i)" icon color="error">
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>

                <!-- Component to view Fav -->
                <v-dialog v-model="showState" max-width="600px">
                    <v-card>
                        <v-card-title>Detalles</v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col>
                                    <div>Palabra: {{ word }}</div>
                                </v-col>
                                <v-col>
                                    <div>Significado: {{ meaning }}</div>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="closeShowState" color="primary">Cerrar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: 'DictionaryView',
    components: {
        NavBar,
        SideBar,
    },
    data() {
        return {
            favsWords: [],
            deleteState: false,
            deleteMessage: null,
            showState: false,
            word: null,
            meaning: null,
        };
    },
        }
    }, 

    methods: {
        async getFavorites() {
            try {
                let user = this.$store.getters.getUser;
                let userId = user?.user?.uid;

                if (userId) {
                    const response = await axios.get(`https://conteinaerappsdiccionary.calmmoss-65dacf7d.eastus.azurecontainerapps.io/allUserFavorites/${userId}`);
                    this.favsWords = response.data;
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        },

        showFav(fav) {
            console.log("Clicked item", fav);
            this.word = fav.favoritos.word;
            this.meaning = fav.favoritos.definition; // Ajusta según tu estructura de datos
            this.showState = true;
        },

        async deleteFav(idDiccionary, index) {
            try {
                let user = this.$store.getters.getUser;
                let userId = user?.user?.uid;

                if (userId && idDiccionary) {
                    const response = await axios.delete(`https://conteinaerappsdiccionary.calmmoss-65dacf7d.eastus.azurecontainerapps.io/deleteUserFavoritesByIdDiccionary/${userId}/${idDiccionary}`);
                    this.deleteState = true;
                    this.deleteMessage = response.data.data;

                    // Remove the deleted item from the array
                    this.favsWords.splice(index, 1);

                    toast.success('Eliminado de favoritos', {
                        autoClose: 3500,
                        theme: 'colored',
                        position: 'top-center',
                        transition: 'bounce',
                    });
                }
            } catch (error) {
                console.error('Error deleting favorite:', error);
            }
            console.log("Deleted!");
        },

        closeShowState() {
            this.showState = false;
        },
    },

    mounted() {
        this.getFavorites();
    },
};
</script>
