/* Get the objects. */
var emailField = document.getElementById('email_field');
var passwordField = document.getElementById('password_field');
var statusLabel = document.getElementById('status_label');
var loginBtn = document.getElementById('login_btn');



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
    fireRef.child('Users').child(user.uid).once('value').then(function(snapshot) {
        var email = snapshot.val()["email"];
        var fullname = snapshot.val()["fullname"];
        var password = snapshot.val()["password"];
        var userID = snapshot.val()["userID"];
        var photoURL = snapshot.val()["photoURL"];

        if(em === email && pass == password) {
            currentUser = {
                "fullname" : fullname,
                "email" : email,
                "password" : password,
                "userID" : userID,
                "photoURL" : photoURL,
                "followers" : 0,
                "following" : 0,
                "bio" : "Bio"
            };
            document.location = "https://recitedverse.herokuapp.com/home";
        } else {
            currentUser = null;
            return;
        }
    });
};