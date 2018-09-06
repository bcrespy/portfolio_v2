import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
  apiKey: "AIzaSyBJ4Rfm_D1dfh-HMAiQ0Ams3_t0xeamhUs",
  authDomain: "portfolio-dbee5.firebaseapp.com",
  databaseURL: "https://portfolio-dbee5.firebaseio.com",
  projectId: "portfolio-dbee5",
  storageBucket: "portfolio-dbee5.appspot.com",
  messagingSenderId: "64779712163"
};

firebase.initializeApp(config);

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

// authentification object
const auth = firebase.auth();

const playground = db.collection('playgrounds');
const work = db.collection('works');

/*playground.get().then( querySnapshot => {
  querySnapshot.forEach( document => {
    console.log( document, document.data() );
  })
})*/

const addPlayground = (data) => {
  return playground.doc().set({
    ...data
  });
};

const getPlayground = function() {
  return new Promise( (resolve, reject) => {
    playground.orderBy("added", "desc").get().then(querySnapshot => {
        
        let payload = [];

        querySnapshot.forEach( document => {
          payload.push({
            ...document.data(),
            id: document.id
          });
        });

        resolve(payload);
        
    }).catch(reject);
  });
}

/**
 * Permet d'ajouter un travail à la collection
 * @param {object} data le travail à ajouter à la liste
 */
const addWork = data => {
  return work.doc().set({...data});
}

/**
 * Récupère la liste des travaux dans la collection 
 */
const getWork = () => {
  return new Promise( (resolve, reject) => {
    work.orderBy("added", "desc").get().then( querySnapshot => {
      let payload = [];

      querySnapshot.forEach( document => {
        payload.push({
          ...document.data(),
          id: document.id
        });
      });

      resolve( payload );

    }).catch(reject);
  });
}


export default {
  getPlayground,
  addPlayground,
  getWork,
  addWork,
  auth
};