import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyBLERRYwWupezz96PDCWbB8vOxBK3ObMfk",
    authDomain: "home-90900.firebaseapp.com",
    databaseURL: "https://home-90900.firebaseio.com",
    projectId: "home-90900",
    storageBucket: "home-90900.appspot.com",
    messagingSenderId: "205382893769",
    appId: "1:205382893769:web:da222b1534cbfe9a8b4d18",
    measurementId: "G-7V9WQFNV8Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.firestore()

export default firebase;