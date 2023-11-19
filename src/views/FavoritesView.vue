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
                            <v-list-item v-for="(fav, i) in favsWords" :key="i" @click="showFav" >
                                <v-list-item-content>
                                    <v-row align="center">
                                    <v-col cols="10">
                                        <v-list-item-title>{{ fav.favoritos.word }}</v-list-item-title>
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
                    <v-btn @click="closeShowState">Cerrar</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>

                <!-- Component to confirm deletion -->
                <v-snackbar v-model="deleteState" :timeout="1500" :v-if="deleteMessage">{{ deleteMessage }}</v-snackbar>

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
            favorites: {},
            favsWords: {},
            favsIds: [],
            frecuencias: {},
            deleteState: false, 
            deleteMessage: null, 
            showState: false, 
            word: null, 
            meaning: null,
        }
    }, 

    //Changes
    methods: {
        getFavorites(){
            let user = this.$store.getters.getUser;
            let userId = user.user.uid;
            this.favsWords = {};
            this.favsIds = [];

             try{
                axios.get(`https://conteinaerappsdiccionary.calmmoss-65dacf7d.eastus.azurecontainerapps.io/allUserFavorites/${userId}`)
                    .then(response => {
                        let res = response.data;
                        this.favorites = res;

                        for(let i = 0; i < this.favorites.length; i++){
                            
                            this.favsIds.push(this.favorites[i].favoritos._id.$oid); 

                            if(!this.favsWords[this.favorites[i].favoritos._id.$oid]){
                                this.favsWords[this.favorites[i].favoritos._id.$oid] = this.favorites[i]
                            }
                           
                        }
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
            // Desglosar favs
            
        }, 
        deleteFav(id){
            try{
                let user = this.$store.getters.getUser;
                let userId = user.user.uid;
                let idDiccionary = id;

                axios.delete(`https://conteinaerappsdiccionary.calmmoss-65dacf7d.eastus.azurecontainerapps.io/deleteUserFavoritesByIdDiccionary/${userId}/${idDiccionary}`)
                .then(response => {
                    let res = response.data;
                    this.deleteState = true; 
                    this.deleteMessage = res.data;
                })
                .catch(error => console.log(error));


                this.getFavorites(); 

                

            }catch(e){
                console.log(e)
            }
            console.log("Deleted!");
        }, 
        closeShowState(){
            this.showState = false;
        }
    }, 
    mounted(){
        this.getFavorites();
    }
}
</script>
