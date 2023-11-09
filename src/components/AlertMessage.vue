<template>
    <v-snackbar v-model="show" :timeout="timeout" :color="color" class="alert-message">
        <v-icon left>{{ icon }}</v-icon>
        {{ message }}
        <v-btn icon @click="show = false">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-snackbar>
</template>

<script>
export default {
    props: {
        message: String,
        type: String, // 'success' or 'error'
        timeout: {
            type: Number,
            default: 3000, // Default timeout of 3 seconds
        },
    },
    computed: {
        color() {
            return this.type === 'success' ? 'success' : 'error';
        },
        icon() {
            return this.type === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle';
        },
    },
    data() {
        return {
            show: true,
        };
    },
};
</script>

<style scoped>
.alert-message {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 1000;
}
</style>
