import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBuP6LYjoZrUeRyR2x23EHyl7Uh5TV5e7o",
  authDomain: "aicte-portal.firebaseapp.com",
  databaseURL: "https://aicte-portal-default-rtdb.firebaseio.com",
  projectId: "aicte-portal",
  storageBucket: "aicte-portal.appspot.com",
  messagingSenderId: "367355584345",
  appId: "1:367355584345:web:77a9ae5cebda3c4a7f7648",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

export { database, storage };
export const auth = getAuth(app);
