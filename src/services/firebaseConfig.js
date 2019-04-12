import firebase from 'firebase/app';
import 'firebase/auth';

  var config = {
    apiKey: "AIzaSyBN1pC4UsxRXv5anWLtFWfYLcOJokDKNMU",
    authDomain: "wondanggui.firebaseapp.com",
    databaseURL: "https://wondanggui.firebaseio.com",
    projectId: "wondanggui",
    storageBucket: "wondanggui.appspot.com",
    messagingSenderId: "629243768837"
  };
  firebase.initializeApp(config);

  var provider = new firebase.auth.FacebookAuthProvider();

  firebase.auth().languageCode = 'en';

  provider.setCustomParameters({
  'display': 'popup'
  });
export { firebase, provider };
