import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDFNjc6Ex27gHPi4mB6Y1skGqJXLKNho1s",
    authDomain: "user-app-97b04.firebaseapp.com",
    projectId: "user-app-97b04",
    storageBucket: "user-app-97b04.firebasestorage.app",
    messagingSenderId: "196201612111",
    appId: "1:196201612111:web:221ecfcd613787afed3b3a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
