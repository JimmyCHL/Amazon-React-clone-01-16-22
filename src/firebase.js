// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_1RdvBhcvYmMyZCaTMiuo6oYQogakdds",
  authDomain: "react-clone-01-13-22.firebaseapp.com",
  projectId: "react-clone-01-13-22",
  storageBucket: "react-clone-01-13-22.appspot.com",
  messagingSenderId: "712365114204",
  appId: "1:712365114204:web:f1349c269508e6932bb799",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
