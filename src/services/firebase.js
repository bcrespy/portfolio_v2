import firebase from 'firebase/app';
import 'firebase/firestore';


const config = {
  apiKey: "AIzaSyBJ4Rfm_D1dfh-HMAiQ0Ams3_t0xeamhUs",
  authDomain: "portfolio-dbee5.firebaseapp.com",
  databaseURL: "https://portfolio-dbee5.firebaseio.com",
  projectId: "portfolio-dbee5",
  storageBucket: "portfolio-dbee5.appspot.com",
  messagingSenderId: "64779712163"
};

firebase.initializeApp(config);

var db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);


let playground = db.collection('playgrounds');

playground.get().then( querySnapshot => {
  querySnapshot.forEach( document => {
    console.log( document, document.data() );
  })
})