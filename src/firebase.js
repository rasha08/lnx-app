import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCF4IFK8B8ECQTOupxPTRoYgVeU7Dr-SEs',
  authDomain: 'first-flight-with-friend-d0c43.firebaseapp.com',
  databaseURL: 'https://first-flight-with-friend-d0c43.firebaseio.com',
  projectId: 'first-flight-with-friend-d0c43',
  storageBucket: 'first-flight-with-friend-d0c43.appspot.com',
  messagingSenderId: '1090647762262'
};
firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
