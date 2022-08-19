import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDuYF_qNG-hVLuD9E0PJdhlnHr_sGKSN6w",
    authDomain: "nathan-mealprep-ad6d5.firebaseapp.com",
    projectId: "nathan-mealprep-ad6d5",
    storageBucket: "nathan-mealprep-ad6d5.appspot.com",
    messagingSenderId: "453092477885",
    appId: "1:453092477885:web:8ee177f45f239582f460d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)