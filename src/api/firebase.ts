import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBkZwTrg2R6wb-EZFov41E325HyxP4nK4I",
    authDomain: "time-log-bf3cd.firebaseapp.com",
    databaseURL: "https://time-log-bf3cd-default-rtdb.firebaseio.com",
    projectId: "time-log-bf3cd",
    storageBucket: "time-log-bf3cd.appspot.com",
    messagingSenderId: "500588140981",
    appId: "1:500588140981:web:ef8f4b2544e8ed25eb61fc",
    measurementId: "G-449F4R7X0B",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Error signing in with Google:", error);
    }
};

export { auth, signInWithGoogle };
