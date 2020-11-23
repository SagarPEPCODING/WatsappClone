// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5yndnO1Ke3hVTDoubTLF32BVmEs_pSgc",
  authDomain: "watsapp-project.firebaseapp.com",
  databaseURL: "https://watsapp-project.firebaseio.com",
  projectId: "watsapp-project",
  storageBucket: "watsapp-project.appspot.com",
  messagingSenderId: "199781271853",
  appId: "1:199781271853:web:dc5f609e3270a7961f6ba4",
  measurementId: "G-E2LNTJ1MN4"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;