// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8QlMbAuUOJt89Y0C0exd5IZqxdfNt-To",
  authDomain: "redux-app-bdf49.firebaseapp.com",
  projectId: "redux-app-bdf49",
  storageBucket: "redux-app-bdf49.appspot.com",
  messagingSenderId: "1017907147018",
  appId: "1:1017907147018:web:b329ef944a52f93f4ecaf3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);