/* Get the objects. */
var emailField = document.getElementById('email_field');
var passwordField = document.getElementById('password_field');
var statusLabel = document.getElementById('status_label');
var loginBtn = document.getElementById('login_btn');

$(document).ready(function() {
    
    if (typeof(Storage) !== "undefined") {
        currentUser = JSON.parse(window.localStorage.getItem("current_user"));
    }
    
});



/**
    Sign in to the user's account.
*/
loginBtn.onclick = function() {
    var em = emailField.value;
    var pass = passwordField.value;
    
    // Sign in.
    fireAuth.signInWithEmailAndPassword(em, pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        
        if(errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-email') {
            statusLabel.style.color = "red";
            statusLabel.innerHTML = "Incorrect Email or Password.";
            statusLabel.style.visibility = "visible";
            currentUser = null;
            return; 
        } else if(errorCode === 'auth/user-not-found') {
            statusLabel.style.color = "red";
            statusLabel.innerHTML = "No user was found with that email and password.";
            statusLabel.style.visibility = "visible";
            currentUser = null;
            return;
        }
    });
    
    var user = fireAuth.currentUser;
    if(user) {
        fireRef.child('Users').child(user.uid).once('value').then(function(snapshot) {
        var email = snapshot.val()["email"];
        var fullname = snapshot.val()["fullname"];
        var password = snapshot.val()["password"];
        var userID = snapshot.val()["userID"];
        var photoURL = snapshot.val()["photoURL"];
        var backgrounImg = snapshot.val()["backgroundImage"];
        var bio = snapshot.val()["bio"];
        var social = snapshot.val()["social_media_links"];
        var likes = snapshot.val()["likes"];
        var favorites = snapshot.val()["favorites"];

        if(em === email && pass == password) {
            currentUser = {
                "fullname" : fullname,
                "email" : email,
                "password" : password,
                "userID" : userID,
                "photoURL" : photoURL,
                "backgroundImage" : backgrounImg,
                "followers" : 0,
                "following" : 0,
                "bio" : bio,
                "social_media_links" : social,
                "likes":likes,
                "favorites":favorites
            };
            
            if (typeof(Storage) !== "undefined") {
                // Code for localStorage/sessionStorage.
                window.localStorage.setItem("current_user", JSON.stringify(currentUser));
            }
            
            document.location.href = "home";
        } else {
            currentUser = null;
            return;
        }
    });
    }
};