import {
    getAuth
} from "firebase/auth";

const auth = getAuth();
auth.onAuthStateChanged((data) => {
    if (!data) {
        window.location.href = "/login.html";
    }

});