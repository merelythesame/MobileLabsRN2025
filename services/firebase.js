import { initializeApp } from 'firebase/app';
import {getAuth, initializeAuth, getReactNativePersistence,} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: 'AIzaSyDFNjc6Ex27gHPi4mB6Y1skGqJXLKNho1s',
    authDomain: 'user-app-97b04.firebaseapp.com',
    projectId: 'user-app-97b04',
    storageBucket: 'user-app-97b04.appspot.com',
    messagingSenderId: '196201612111',
    appId: '1:196201612111:web:221ecfcd613787afed3b3a',
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
