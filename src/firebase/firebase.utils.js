import firebase from "firebase/compat/app";

import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyAOGw3SJqtZ094X-hq9Sx5R0pWm2_vhNk4",
  authDomain: "brayecommerce-718c2.firebaseapp.com",
  databaseURL: "https://brayecommerce-718c2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "brayecommerce-718c2",
  storageBucket: "brayecommerce-718c2.appspot.com",
  messagingSenderId: "197787638008",
  appId: "1:197787638008:web:41ed80981d59c80ff9030d",
  measurementId: "G-1DSH0VVG5Z"

};

export const createUserProfileDocument = async (userAuth) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/ ${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        // ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user :", error.message);
    }
  }
  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();

  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
