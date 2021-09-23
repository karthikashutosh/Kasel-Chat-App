import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDNPVpN_KDkHfHLb6KVTOVsc2k3XWMXwls",
  authDomain: "kasel-chat-app.firebaseapp.com",
  projectId: "kasel-chat-app",
  storageBucket: "kasel-chat-app.appspot.com",
  messagingSenderId: "249513212068",
  appId: "1:249513212068:web:e7479a05f3cda86f3a0e31",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage().ref("images");
const audioStorage = firebase.storage().ref("audios");
const createTimestamp = firebase.firestore.FieldValue.serverTimestamp;
const serverTimestamp = firebase.database.ServerValue.TIMESTAMP;

export {
  db,
  auth,
  provider,
  storage,
  audioStorage,
  createTimestamp,
  serverTimestamp,
};