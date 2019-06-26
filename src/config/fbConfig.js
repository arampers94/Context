import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDXbwZIgYEoKj6WPxL2FroQnNx_cC3OT4g",
  authDomain: "context-fceab.firebaseapp.com",
  databaseURL: "https://context-fceab.firebaseio.com",
  projectId: "context-fceab",
  storageBucket: "context-fceab.appspot.com",
  messagingSenderId: "158564045765",
  appId: "1:158564045765:web:bb9c50e61dac1dbf"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;