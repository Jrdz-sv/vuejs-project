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
                            <v-list-item v-for="(word, index) in favoriteWords" :key="index">
                                <v-list-item-content>
                                    <v-list-item-title>{{ word }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
// import axios from 'axios';
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
            favoriteWords: ['awesome', 'fantastic', 'amazing', 'incredible']
        }
    }
}
</script>
