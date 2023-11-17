<template>
    <v-app>
        <NavBar />
        <SideBar />
        <v-main>
            <v-container>
                <v-card>
                    <v-card-title>My Favorite Words</v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-item v-for="(word, i) in favoriteWords" :key="i" @click="showFav">
                                <v-list-item-content>
                                    <v-row align="center">
                                    <v-col cols="10">
                                        <v-list-item-title>{{ word }}</v-list-item-title>
                                    </v-col>
                                    <v-col cols="1">
                                        <v-icon @click="getFavorites" class="success--text">mdi-eye</v-icon>
                                    </v-col>
                                    <v-col cols="1">
                                        <v-icon @click="deleteFav(i)" class="success--error">mdi-delete</v-icon>
                                    </v-col>
                                    </v-row>
                                </v-list-item-content>
                                </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>


                <!-- Component to view Fav -->

                <!-- Component to confirm deletion -->
                <!-- Diálogo de confirmación -->
                <v-dialog v-model="dialogo" max-width="500px">
                <v-card>
                    <v-card-title class="headline">¿Estás seguro?</v-card-title>
                    <v-card-text>
                    Esta acción eliminará permanentemente el registro. ¿Deseas continuar?
                    </v-card-text>
                    <v-card-actions>
                    <!-- Botón para confirmar la eliminación -->
                    <v-btn color="error" @click="eliminarRegistro">Eliminar</v-btn>
                    <!-- Botón para cerrar el diálogo sin eliminar el registro -->
                    <v-btn @click="cerrarDialogo">Cancelar</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>


            </v-container>
        </v-main>
    </v-app>
</template>

<script>
// import axios from 'axios';
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue';
import axios from 'axios';

export default {
    name: 'DictionaryView',
    components: {
        NavBar,
        SideBar,
    },
    data() {
        return {
            favoriteWords: ['awesome', 'fantastic', 'amazing', 'incredible'], 
            dialogo: false
        }
    }, 

    //Changes
    methods: {
        async getFavorites(){
            let user = this.$store.getters.getUser;
            let userId = user.user.uid;

             try{
                axios.get(`https://conteinaerappsdiccionary.calmmoss-65dacf7d.eastus.azurecontainerapps.io/allUserFavorites/${userId}`)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error);
                    })
             }catch(e){
                console.log(e);
             }
        }, 
        showFav(){
            console.log("Clicked item");
        }, 
        deleteFav(){
            try{
                let user = this.$store.getters.getUser;
                let userId = user.user.uid;
                // MISSING  ID_DICCIONARY
                let idDiccionary = null;

                axios.delete(`https://conteinaerappsdiccionary.calmmoss-65dacf7d.eastus.azurecontainerapps.io/deleteUserFavoritesByIdDiccionary/${userId}/${idDiccionary}`)
            }catch(e){
                console.log(e)
            }
            console.log("Deleted!");
        }
    }, 
    mounted(){
        this.getFavorites;
    }
}
</script>
