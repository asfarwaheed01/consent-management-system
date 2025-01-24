// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmKsfLiWyTfYUMrv47Ck3JjgVLHGshjTI",
  authDomain: "chris-ced7f.firebaseapp.com",
  projectId: "chris-ced7f",
  storageBucket: "chris-ced7f.firebasestorage.app",
  messagingSenderId: "672817773865",
  appId: "1:672817773865:web:33226a6ed39e0b16c24b38",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
