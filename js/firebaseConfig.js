import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCGtgB_tcTzZwtnHywONqfbsbhQZ4YZriw",
    authDomain: "web-communication-assignment.firebaseapp.com",
    projectId: "web-communication-assignment",
    storageBucket: "web-communication-assignment.appspot.com",
    messagingSenderId: "1053131457945",
    appId: "1:1053131457945:web:bf93cd13404b20893cff08"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };