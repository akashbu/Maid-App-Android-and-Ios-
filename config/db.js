var firebase = require('firebase-admin');
var serviceAccount = require("../serviceAccountKey.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    apiKey: "AIzaSyAm_QR6rUWIAnvj_-Blca4RsceHra-jIJQ",
    authDomain: "maidhive.firebaseapp.com",
    databaseURL: "https://maidhive.firebaseio.com",
    projectId: "maidhive",
    storageBucket: "",
    messagingSenderId: "708491559802"

});

module.exports = firebase;