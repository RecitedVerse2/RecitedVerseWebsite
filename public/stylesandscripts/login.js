/* Get the objects. */
var emailField = document.getElementById('email_field');
var passwordField = document.getElementById('password_field');
var statusLabel = document.getElementById('status_label');
var loginBtn = document.getElementById('login_btn');



/**
    Sign in to the user's account.
*/
loginBtn.onclick = function() {
    var email = emailField.value;
    var password = passwordField.value;
    
    // Sign in.
    fireAuth.signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        
        if(errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-email') {
            statusLabel.innerHTML = "Incorrect Email or Password.";
            statusLabel.style.visibility = "visible";
            return;   
        }
    });
    
    // Display status
    statusLabel.style.visibility = "visible";
    statusLabel.style.color = "green";
    statusLabel.innerHTML = "Signing in!";

    // Save the user object.
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            
            fireRef.child('Users').child(user.uid).once('value').then(function(snapshot) {
                var email = snapshot.val()["email"];
                var fullname = snapshot.val()["fullname"];
                var password = snapshot.val()["password"];
                var userID = snapshot.val()["userID"];
                var photoURL = snapshot.val()["photoURL"];
                
                currentUser = {
                    "fullname" : fullname,
                    "email" : email,
                    "password" : password,
                    "userID" : user.uid,
                    "photoURL" : photoURL
                };
            });
            // Go to the home page.
            //document.location = "";
        } else {}
    });

};