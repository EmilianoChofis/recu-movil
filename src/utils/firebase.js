// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getDatabase} from "firebase/database";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCizp8p01OC-mbTjqTL7xSPCxSJIc4XSt0",
    authDomain: "recupera-27d9f.firebaseapp.com",
    projectId: "recupera-27d9f",
    storageBucket: "recupera-27d9f.appspot.com",
    messagingSenderId: "268366413976",
    appId: "1:268366413976:web:bfa4cb00f7226c1b8a10ed",
    databaseURL: 'https://recupera-27d9f-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
export const initiFirebase = initializeApp(firebaseConfig);
export const database = getDatabase(initiFirebase);





/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBePEYO7QbfzhLgF-9uqiopao9WAm94IQk",
    authDomain: "travel128-9bfc2.firebaseapp.com",
    projectId: "travel128-9bfc2",
    storageBucket: "travel128-9bfc2.appspot.com",
    messagingSenderId: "844791369113",
    appId: "1:844791369113:web:a33664d466c8428c755708"
};

// Initialize Firebase
export const initFirebase = initializeApp(firebaseConfig);*/
