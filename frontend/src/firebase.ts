import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0mIBeRRhN86LhzntswtSWxELdqY3bqhE",
  authDomain: "chat-application-db540.firebaseapp.com",
  projectId: "chat-application-db540",
  storageBucket: "chat-application-db540.firebasestorage.app",
  messagingSenderId: "73735564746",
  appId: "1:73735564746:web:e0eedb6bcc47822adeb333",
  measurementId: "G-M3L1WDKGGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
//const analytics = getAnalytics(app);