<template>
    <!-- Menú lateral -->
    <v-navigation-drawer class="bg-light-blue-accent-1" theme="dark" permanent expand-on-hover rail>
        <v-list>
            <v-list-item class="user" prepend-icon="mdi-badge-account" title="Menú" start>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list dense nav>
            <v-list-item to="/dictionary" prepend-icon="mdi-book" title="Diccionario" value="dictionary"></v-list-item>
            <v-list-item to="/translator" prepend-icon="mdi-translate" title="Traductor" value="translator"></v-list-item>
            <v-list-item to="/favorites" prepend-icon="mdi-heart" title="Favoritos" value="favorites"></v-list-item>
        </v-list>
        <template v-slot:append>
            <div class="pa-2">
                <v-btn to="/" block>
                    <v-icon>mdi-logout</v-icon>
                </v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'SideBar',
    components: {

    },
}
</script>