// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
import {
    getAnalytics
} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAAr7l7D9vn1oi2yMfPxNW-wA8kPV4L_3U",
    authDomain: "fshop-3cbbe.firebaseapp.com",
    databaseURL: "https://fshop-3cbbe-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fshop-3cbbe",
    storageBucket: "fshop-3cbbe.appspot.com",
    messagingSenderId: "483860399019",
    appId: "1:483860399019:web:31863fc7cb8283e69188ee",
    measurementId: "G-HNPD5CSYN1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);