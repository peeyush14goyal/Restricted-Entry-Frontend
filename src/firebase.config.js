import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDkuk7jXLolB_2akt5_1NddMri09ZVqv5M",
  authDomain: "face-b84fc.firebaseapp.com",
  projectId: "face-b84fc",
  storageBucket: "face-b84fc.appspot.com",
  messagingSenderId: "1013357940700",
  appId: "1:1013357940700:web:4bae02b109c946bb3a8919",
  measurementId: "G-KRVEJ3DV6L",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
