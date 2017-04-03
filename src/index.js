import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAliB2PpmncS1gNmKtOoIeQ4LgC74cpFUw",
    authDomain: "recitedverse-6efe4.firebaseapp.com",
    databaseURL: "https://recitedverse-6efe4.firebaseio.com",
    storageBucket: "recitedverse-6efe4.appspot.com",
    messagingSenderId: "1078860066504"
}
firebase.initializeApp(config);



import App from './App';

ReactDOM.render( <App />,document.getElementById('root') );
