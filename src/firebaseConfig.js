// firebaseConfig.js
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBk2ztZ1LjlsZ7wZm44Un9gOWorlm-fQ04",
    authDomain: "vuejs-firebase-auth-dbfa0.firebaseapp.com",
    projectId: "vuejs-firebase-auth-dbfa0",
    storageBucket: "vuejs-firebase-auth-dbfa0.appspot.com",
    messagingSenderId: "995733003744",
    appId: "1:995733003744:web:99378d193d71354d4cdf85"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;