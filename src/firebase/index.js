import firebase from 'firebase';
import "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAfiZOPSteqeN6TUN05Y7ls77ftgWB7sBw",
  authDomain: "play-or-swipe.firebaseapp.com",
  databaseURL: "https://play-or-swipe-default-rtdb.firebaseio.com",
  projectId: "play-or-swipe",
  storageBucket: "play-or-swipe.appspot.com",
  messagingSenderId: "783080469952",
  appId: "1:783080469952:web:9d7e31620827e1c17fc425"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default }
  