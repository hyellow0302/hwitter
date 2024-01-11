import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: "hwitter-9683b.firebaseapp.com",
  projectId: "hwitter-9683b",
  storageBucket: "hwitter-9683b.appspot.com",
  messagingSenderId: "278348714324",
  appId: "1:278348714324:web:e5dcf9356089c9d209b8c1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
