// Initialize Firebase
var config = {
    apiKey: "AIzaSyAliB2PpmncS1gNmKtOoIeQ4LgC74cpFUw",
    authDomain: "recitedverse-6efe4.firebaseapp.com",
    databaseURL: "https://recitedverse-6efe4.firebaseio.com",
    storageBucket: "recitedverse-6efe4.appspot.com",
    messagingSenderId: "1078860066504"
};
firebase.initializeApp(config);


/* A reference to the firebase database and storage. */
var fireRef = firebase.database().ref();
var storageRef = firebase.storage().ref();
var fireAuth = firebase.auth();

/* A reference to the current user. */
var currentUser;





/** A method for loading the current user object. */
function loadCurrentUser() {
    if (typeof(Storage) !== "undefined") {
        var cUser = JSON.parse(window.localStorage.getItem("current_user"));
        return cUser;
    } else {
        return null;
    }
}