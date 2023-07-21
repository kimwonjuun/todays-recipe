import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyAUjaq5zxw7su8vIonhdoUy0ENoJGe47Jw',
  authDomain: 'todays-recipe.firebaseapp.com',
  projectId: 'todays-recipe',
  storageBucket: 'todays-recipe.appspot.com',
  messagingSenderId: '85150150047',
  appId: '1:85150150047:web:746a39b9ac9dbfcfd6e1aa',
};

const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storage = getStorage(app);
