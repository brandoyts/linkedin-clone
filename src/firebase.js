import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyBMqJsf2HLiGpqUeFCx97Y0wMddPfi8lK4",
	authDomain: "linkedin-clone-d9260.firebaseapp.com",
	projectId: "linkedin-clone-d9260",
	storageBucket: "linkedin-clone-d9260.appspot.com",
	messagingSenderId: "610696911472",
	appId: "1:610696911472:web:c7cc4b52344231fbf0f2b5",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
