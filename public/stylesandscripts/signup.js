/* Get the objects. */
var fullNameField = document.getElementById('fullname_field');
var emailField = document.getElementById('email_field');
var passwordField1 = document.getElementById('password_field_1');
var passwordField2 = document.getElementById('password_field_2');
var statusLabel = document.getElementById('status_label');
var createAccountBtn = document.getElementById('createAccount_btn');


$(document).ready(function() {
    
    if (typeof(Storage) !== "undefined") {
        currentUser = JSON.parse(window.localStorage.getItem("current_user"));
    }
    
});


/**
    Creates an account in Firebase.
*/
createAccountBtn.onclick = function() {
    var fullname = fullNameField.value;
    var email = emailField.value;
    var pass1 = passwordField1.value;
    var pass2 = passwordField2.value;
    
    if(fullname != null && fullname != "" && email != null && email != "" && pass1 != null && pass1 != "" && pass2 != null && pass2 != "") {

        if(pass1 == pass2) {
            
            fireAuth.createUserWithEmailAndPassword(email, pass1).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                if(errorCode === 'auth/weak-password') {
                    statusLabel.style.visibility = "visible";
                    statusLabel.innerHTML = "Password must be at least six characters";
                    return;
                    
                } else if(errorCode === 'auth/email-already-in-use') {
                    statusLabel.style.visibility = "visible";
                    statusLabel.innerHTML = "That email is already in use.";
                    return;
                }                                
            }); // End of creating the user.
        
            // Display status
            statusLabel.style.visibility = "visible";
            statusLabel.style.color = "green";
            statusLabel.innerHTML = "Creating account!";
            
            // Sign the user in so you can get access to the user object.
            firebase.auth().signInWithEmailAndPassword(email, pass1).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                
                // If there is a problem, return.
                if(errorCode != null) {
                    return;
                }
            });
            
            // Save the user object.
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    currentUser = {
                        "fullname" : fullname,
                        "email" : email,
                        "password" : pass1,
                        "userID" : user.uid,
                        "photoURL" : user.photoURL,
                        "followers" : 0,
                        "following" : 0,
                        "bio" : "Bio"
                    };
                    fireRef.child("Users").child(user.uid).set(currentUser);
                    
                    if (typeof(Storage) !== "undefined") {
                        // Code for localStorage/sessionStorage.
                        window.localStorage.setItem("current_user", JSON.stringify(currentUser));
                    }
                    
                    // Go to the user's profile page.
                    document.location = "https://recitedverse.herokuapp.com/profile";
                } else {}
            });
            
        } // End of checking if the two passwords match.
        else {
            statusLabel.style.visibility = "visible";
            statusLabel.innerHTML = "Passwords do not match.";
        }
            
    } // End of first if-statement.
    else {
        statusLabel.style.visibility = "visible";
        statusLabel.innerHTML = "Please fill out each item.";
    }
};
