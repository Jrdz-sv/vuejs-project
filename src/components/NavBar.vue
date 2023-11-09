<template>
        <v-app-bar app color="indigo-darken-4" dark clipped-left class="elevation-0">
            <v-toolbar-title class="font-weight-bold text-h5">Proyecto Final</v-toolbar-title>
            <div class="ml-auto">
                <v-btn to="/" text class="mr-2"><v-icon>mdi-logout</v-icon> Cerrar Sesión</v-btn>
            </div>
        </v-app-bar>
</template>

<script>
export default {
    name: 'AppBar',
}
</script>


<style scoped>
.selected {
    background-color: rgba(255, 255, 255, 0.12) !important;
    color: white !important;
}

.elevation {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
}

.user {
    font-size: 25px;
    /* Adjust the size as needed */
}
</style>


