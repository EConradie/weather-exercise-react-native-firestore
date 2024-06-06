import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyD__bN-9jNfpLL0RccZbY2fJojm4yidZnA",
    authDomain: "class-work-56e70.firebaseapp.com",
    projectId: "class-work-56e70",
    storageBucket: "class-work-56e70.appspot.com",
    messagingSenderId: "1014466199993",
    appId: "1:1014466199993:web:bf24a5c34d498f893a7668"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Cloud Firestore, Cloud Storage and get a reference to the service
export var db = getFirestore(app)