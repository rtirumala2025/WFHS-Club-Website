import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from 'react';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCIFI83oD_B0zF_H72qMODRDpw1UfT4hzQ",
  authDomain: "wfhs-club-webapp.firebaseapp.com",
  projectId: "wfhs-club-webapp",
  storageBucket: "wfhs-club-webapp.appspot.com",
  messagingSenderId: "599643093665",
  appId: "1:599643093665:web:a906f4edc33823badc4ee0",
  measurementId: "G-N66D9HT1G4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth setup
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ✅ Set auth persistence
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set.");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

// Auth Context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = loading, null = not logged in

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export { app, auth, googleProvider };
