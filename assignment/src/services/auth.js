import {
    signInWithPopup,
    GoogleAuthProvider,
    getAuth
} from "firebase/auth";
const btn = document.querySelector(".btn-login");
const auth = getAuth();
const provider = new GoogleAuthProvider();
btn.addEventListener("click", async () => {
    await signInWithPopup(auth, provider);
    auth.onAuthStateChanged((data) => {
        if (data && data.uid) {
            window.location.href = "/";
        }
    });

});