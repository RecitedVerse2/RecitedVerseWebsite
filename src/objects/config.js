var Rebase = require('re-base');
var firebase = require('firebase');
var app = firebase.initializeApp({
      apiKey: "AIzaSyAliB2PpmncS1gNmKtOoIeQ4LgC74cpFUw",
      authDomain: "recitedverse-6efe4.firebaseapp.com",
      databaseURL: "https://recitedverse-6efe4.firebaseio.com/",
      storageBucket: "gs://recitedverse-6efe4.appspot.com",
});
export const base = Rebase.createClass(app.database());