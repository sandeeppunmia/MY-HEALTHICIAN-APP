import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyC-thtPsTVKZwRxKFHsW-_xUpIhTIGHIxA",
    authDomain: "healthician-app.firebaseapp.com",
    projectId: "healthician-app",
    storageBucket: "healthician-app.appspot.com",
    messagingSenderId: "762666583401",
    appId: "1:762666583401:web:cd19e148ade3671c1ce9f8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();