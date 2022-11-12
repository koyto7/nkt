// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {} from 'firebase/auth';
import {} from 'firebase/firestore';
import {} from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBznmyMTqdqP2koqEtqkfR2wEhxl4PzC7k',
  authDomain: 'nkt-firebaseapp.firebaseapp.com',
  projectId: 'nkt-firebaseapp',
  storageBucket: 'nkt-firebaseapp.appspot.com',
  messagingSenderId: '596851014901',
  appId: '1:596851014901:web:4e7bc97c4f3b8c7e7419bc',
  measurementId: 'G-FHPLSTEK6V',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
