import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB3lFBBU09nxOWfxymDhU3FQakoXAHOFiw",
  authDomain: "financial-flow-fe.firebaseapp.com",
  projectId: "financial-flow-fe",
  storageBucket: "financial-flow-fe.appspot.com",
  messagingSenderId: "7995863534",
  appId: "1:7995863534:web:9b0dfaf43acd0da12fdeff"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };