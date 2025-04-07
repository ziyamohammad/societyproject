
import { initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCtegc72QL0bumlJL8DINwTPHE1EW5T4UQ",
  authDomain: "prepwise-a1779.firebaseapp.com",
  projectId: "prepwise-a1779",
  storageBucket: "prepwise-a1779.firebasestorage.app",
  messagingSenderId: "74511285485",
  appId: "1:74511285485:web:81a6bf7e48e53b9fb5a0e4",
  measurementId: "G-GFJ59QW2LB"
};


const app =initializeApp(firebaseConfig) ;

export const auth = getAuth();
export const db= getFirestore(app);
export default app;