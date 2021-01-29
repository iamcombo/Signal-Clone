import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_DIK8Vdse0kbpFd59IM-hMazW90iiqRQ",
  authDomain: "signal-clone-d0dc3.firebaseapp.com",
  projectId: "signal-clone-d0dc3",
  storageBucket: "signal-clone-d0dc3.appspot.com",
  messagingSenderId: "309005742703",
  appId: "1:309005742703:web:f21e43a03bc293aff8d39a",
  measurementId: "G-TNZ9N1VXG7"
};

let app;

if(firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };