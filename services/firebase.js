import { initializeApp } from 'firebase/app';
import {getAuth, initializeAuth, getReactNativePersistence,} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyDaAL1uwbDIditriHelaxnZJLDXCWc3n5I",
    authDomain: "lab-7-7469e.firebaseapp.com",
    projectId: "lab-7-7469e",
    storageBucket: "lab-7-7469e.firebasestorage.app",
    messagingSenderId: "605038257977",
    appId: "1:605038257977:web:53687c7c0a56d8ff26aae8"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
