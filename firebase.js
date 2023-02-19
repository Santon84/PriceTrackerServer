// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app") ;
const { getFirestore} = require('firebase/firestore') ;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlKJk5BsVlQWz_DrhEd15KSqndPIKifSw",
  authDomain: "pricetracker-bec04.firebaseapp.com",
  databaseURL: "https://pricetracker-bec04-default-rtdb.firebaseio.com",
  projectId: "pricetracker-bec04",
  storageBucket: "pricetracker-bec04.appspot.com",
  messagingSenderId: "66764471803",
  appId: "1:66764471803:web:3867f7542a1f83ad48df5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db }