// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-yGAD4QARAhoplSDRBoyZGKmqVYVCdqM",
  authDomain: "islamicinsight-ec7f5.firebaseapp.com",
  projectId: "islamicinsight-ec7f5",
  storageBucket: "islamicinsight-ec7f5.appspot.com",
  messagingSenderId: "783478541804",
  appId: "1:783478541804:web:0f95e56caf67b48e3504c9",
  measurementId: "G-DG23L697KJ",
  databaseURL : "https://islamicinsight-ec7f5-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
export  {app, auth};