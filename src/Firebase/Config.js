import app from "firebase/app"
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBJz6VKqj1otrMX6XyM_VNJx2o6HJeRdq4",
  authDomain: "stock-75a31.firebaseapp.com",
  projectId: "stock-75a31",
  storageBucket: "stock-75a31.firebasestorage.app",
  messagingSenderId: "419898234376",
  appId: "1:419898234376:web:a063906a5509e349c863bd"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = app.firestore()
