import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
// Import the initialized Firebase app from the configuration file
import firebaseApp from './firebaseConfig';

loadFonts();

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .provide('firebaseApp', firebaseApp) // Provide the Firebase app to the application
  .mount('#app');