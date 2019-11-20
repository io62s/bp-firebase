import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpRWHskHz43f_K9dzHedADzxFfCjCs5js",
  authDomain: "blog-io.firebaseapp.com",
  databaseURL: "https://blog-io.firebaseio.com",
  projectId: "blog-io",
  storageBucket: "blog-io.appspot.com",
  messagingSenderId: "852952600085",
  appId: "1:852952600085:web:b86c7bc1525a3a1069c81c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const signOut = () => auth.signOut();

export default firebase;
