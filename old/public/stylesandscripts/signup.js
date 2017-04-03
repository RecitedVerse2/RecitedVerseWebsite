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
                    statusLabel.style.color = "red";
                    statusLabel.style.visibility = "visible";
                    statusLabel.innerHTML = "Password must be at least six characters";
                    return;
                    
                } else if(errorCode === 'auth/email-already-in-use') {
                    statusLabel.style.color = "red";
                    statusLabel.style.visibility = "visible";
                    statusLabel.innerHTML = "That email is already in use.";
                    return;
                }                                
            }).then(function(user) {
              
                // Save it to the database.
                var social = {"facebook":"","linkedin":"","instagram":"","twitter":""};
                currentUser = {
                    "fullname" : fullname,
                    "email" : email,
                    "password" : pass1,
                    "userID" : user.uid,
                    "photoURL" : "https://firebasestorage.googleapis.com/v0/b/recitedverse-6efe4.appspot.com/o/RV_Website%2FcircleProfilePic.png?alt=media&token=7725c514-2e32-4feb-a4ff-de2b8be2e865",
                    "backgroundImage" : "https://firebasestorage.googleapis.com/v0/b/recitedverse-6efe4.appspot.com/o/RV_Website%2FemptyProfileBackground.png?alt=media&token=68191f6d-9d79-4a2e-9047-87b7803e52f9",
                    "followers" : 0,
                    "following" : 0,
                    "bio" : "Bio",
                    "social_media_links" : social,
                    "likes":[],
                    "favorites":[]
                };
                fireRef.child("Users").child(user.uid).set(currentUser);

                if (typeof(Storage) !== "undefined") {
                    window.localStorage.setItem("current_user", JSON.stringify(currentUser));
                }

                // Go to the user's profile page.
                document.location.href = "profile";
                
            }); // End of creating the user.
        
            // Display status
            statusLabel.style.color = "green";
            statusLabel.style.visibility = "visible";
            statusLabel.innerHTML = "Creating account!";
            
        } // End of checking if the two passwords match.
        else {
            statusLabel.style.color = "red";
            statusLabel.style.visibility = "visible";
            statusLabel.innerHTML = "Passwords do not match.";
        }
            
    } // End of first if-statement.
    else {
        statusLabel.style.color = "red";
        statusLabel.style.visibility = "visible";
        statusLabel.innerHTML = "Please fill out each item.";
    }
};
