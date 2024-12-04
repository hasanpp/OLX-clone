import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-RervdcCl-f77HSWD7VWved0BuNCbtQo",
  authDomain: "olx-clone-6ca4a.firebaseapp.com",
  projectId: "olx-clone-6ca4a",
  storageBucket: "olx-clone-6ca4a.appspot.com", 
  messagingSenderId: "600234168694",
  appId: "1:600234168694:web:c0a1abfdf861225188aa57"
};



let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const db = getFirestore(app);
