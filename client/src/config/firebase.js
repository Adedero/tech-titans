import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "csc-tech-titans.firebaseapp.com",
  projectId: "csc-tech-titans",
  storageBucket: "csc-tech-titans.appspot.com",
  messagingSenderId: "867433604306",
  appId: "1:867433604306:web:73617e24149a9144d0f90b",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


export { storage, app };


