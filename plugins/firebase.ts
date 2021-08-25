import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      "apiKey": "AIzaSyCfZUrKteJ2EKwJg20O41sdyv3cMqUTwLo",
      "authDomain": "sample-firestore-infinity-load.firebaseapp.com",
      "databaseURL": "",
      "messagingSenderId": "664418387635",
      "projectId": "sample-firestore-infinity-load",
      "storageBucket": "sample-firestore-infinity-load.appspot.com"
    }
  )
}

export default firebase
export const firestore = firebase.firestore()
