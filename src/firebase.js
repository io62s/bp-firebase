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

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error(error.message);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore
      .collection("users")
      .doc(uid)
      .get();
    return { uid, ...userDocument.data() };
  } catch (error) {
    console.error(error.message);
  }
};

export default firebase;
