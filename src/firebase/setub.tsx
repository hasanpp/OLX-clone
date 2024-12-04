
import { initializeApp, getApps } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC-RervdcCl-f77HSWD7VWved0BuNCbtQo",
  authDomain: "olx-clone-6ca4a.firebaseapp.com",
  projectId: "olx-clone-6ca4a",
  storageBucket: "olx-clone-6ca4a.firebasestorage.app",
  messagingSenderId: "600234168694",
  appId: "1:600234168694:web:97b5e97b59fcf63288aa57"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}


export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()