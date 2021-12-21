import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { firebaseConfig, firebaseConfig, firebaseConfig, firebaseConfig } from "./config";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: `${firebaseConfig.apiKey}`,
    authDomain: `${firebaseConfig.authDomain}`,
    projectId: `${firebaseConfig.projectId}`,
    storageBucket: `${firebaseConfig.storageBucket}`,
    messagingSenderId: `${firebaseConfig.messagingSenderId}`,
    appId: `${firebaseConfig.appId}`
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.db = firebase.firestore()
firebase.auth = firebase.auth()
export default firebase